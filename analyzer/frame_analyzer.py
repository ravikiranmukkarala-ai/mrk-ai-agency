"""
OpenCV Frame Analyzer Module for Website Motion Analyzer.
Extracts frames from Playwright video recordings, analyzes visual motion/difference,
and generates contact sheets and visual motion diffs.
"""

import os
from typing import List, Dict, Tuple, Optional, Any
import cv2
import numpy as np


def extract_frames(
    video_path: str,
    sample_interval_sec: float = 0.5,
    max_frames: int = 24
) -> List[Tuple[float, np.ndarray]]:
    """
    Extracts frames from a video file at sample intervals.
    Returns list of (timestamp_seconds, frame_bgr_array).
    """
    if not os.path.exists(video_path):
        print(f"[FrameAnalyzer] Warning: Video path not found: {video_path}")
        return []

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"[FrameAnalyzer] Warning: Could not open video: {video_path}")
        return []

    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration_sec = total_frames / fps if fps > 0 else 0

    extracted = []
    current_sec = 0.0
    step = max(sample_interval_sec, 0.1)

    while current_sec <= duration_sec and len(extracted) < max_frames:
        frame_idx = int(current_sec * fps)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret or frame is None:
            break
        extracted.append((round(current_sec, 2), frame))
        current_sec += step

    cap.release()
    return extracted


def compute_frame_motion_metrics(
    frames: List[Tuple[float, np.ndarray]]
) -> List[Dict[str, Any]]:
    """
    Compares consecutive frames using OpenCV absdiff and thresholding.
    Computes motion scores and detects key visual movement points.
    """
    metrics = []
    if len(frames) < 2:
        return metrics

    for i in range(len(frames) - 1):
        t1, f1 = frames[i]
        t2, f2 = frames[i + 1]

        # Convert to grayscale
        g1 = cv2.cvtColor(f1, cv2.COLOR_BGR2GRAY)
        g2 = cv2.cvtColor(f2, cv2.COLOR_BGR2GRAY)

        # Blur slightly to eliminate video compression micro-noise
        g1_blur = cv2.GaussianBlur(g1, (7, 7), 0)
        g2_blur = cv2.GaussianBlur(g2, (7, 7), 0)

        diff = cv2.absdiff(g1_blur, g2_blur)
        _, thresh = cv2.threshold(diff, 20, 255, cv2.THRESH_BINARY)

        total_pixels = thresh.size
        changed_pixels = int(np.count_nonzero(thresh))
        change_ratio = changed_pixels / total_pixels if total_pixels > 0 else 0.0

        # Mean intensity difference
        mean_intensity_diff = float(np.mean(diff))

        metrics.append({
            "from_time_sec": t1,
            "to_time_sec": t2,
            "changed_pixels": changed_pixels,
            "change_percentage": round(change_ratio * 100, 2),
            "mean_intensity_diff": round(mean_intensity_diff, 2),
            "movement_detected": change_ratio > 0.005
        })

    return metrics


def create_contact_sheet(
    frames: List[Tuple[float, np.ndarray]],
    output_path: str,
    cols: int = 4,
    thumb_width: int = 360
) -> Optional[str]:
    """
    Generates a contact sheet grid showing sampled animation frames with timestamps.
    """
    if not frames:
        return None

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)

    # Determine dimensions
    h, w, _ = frames[0][1].shape
    aspect = h / w
    thumb_height = int(thumb_width * aspect)

    num_frames = len(frames)
    rows = (num_frames + cols - 1) // cols

    sheet_w = cols * thumb_width
    sheet_h = rows * (thumb_height + 30)  # 30px for timestamp banner
    sheet = np.zeros((sheet_h, sheet_w, 3), dtype=np.uint8)
    sheet[:] = (24, 24, 27)  # Dark slate background

    for idx, (timestamp, frame) in enumerate(frames):
        r = idx // cols
        c = idx % cols

        x = c * thumb_width
        y = r * (thumb_height + 30)

        resized = cv2.resize(frame, (thumb_width, thumb_height), interpolation=cv2.INTER_AREA)
        sheet[y:y + thumb_height, x:x + thumb_width] = resized

        # Add label
        label_y = y + thumb_height + 20
        cv2.putText(
            sheet,
            f"T={timestamp}s (Frame {idx+1})",
            (x + 10, label_y),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (200, 200, 200),
            1,
            cv2.LINE_AA
        )

    cv2.imwrite(output_path, sheet)
    return output_path


def create_motion_highlight_diff(
    frame1: np.ndarray,
    frame2: np.ndarray,
    output_path: str
) -> Optional[str]:
    """
    Creates a visual motion difference overlay highlighting changed areas between two frames.
    """
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)

    g1 = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY)
    g2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)

    g1 = cv2.GaussianBlur(g1, (7, 7), 0)
    g2 = cv2.GaussianBlur(g2, (7, 7), 0)

    diff = cv2.absdiff(g1, g2)
    _, thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)

    # Find contours of moving regions
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    highlighted = frame2.copy()
    for cnt in contours:
        if cv2.contourArea(cnt) > 100:  # Ignore tiny noise
            x, y, w, h = cv2.boundingRect(cnt)
            # Draw cyan bounding box around motion regions
            cv2.rectangle(highlighted, (x, y), (x + w, y + h), (255, 220, 0), 2)

    cv2.imwrite(output_path, highlighted)
    return output_path
