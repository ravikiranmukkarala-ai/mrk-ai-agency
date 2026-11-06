"""
CLI Entrypoint and Orchestration Runner for Website Motion Analyzer.
Runs Phase 2 (crawler), Phase 3 (CSS/JS inspection), and Phase 4 (OpenCV frame analysis).
"""

import os
import sys
import json
import argparse
from typing import Dict, Any

from analyzer.crawler import WebsiteMotionCrawler
from analyzer.frame_analyzer import (
    extract_frames,
    compute_frame_motion_metrics,
    create_contact_sheet,
    create_motion_highlight_diff
)


def run_analysis(
    target_url: str = "https://ali-and-ai.com/",
    output_dir: str = "captures",
    headless: bool = True
) -> Dict[str, Any]:
    print("=" * 60)
    print(f"MRK AI Agency - Website Motion Analyzer")
    print(f"Target URL: {target_url}")
    print(f"Output Directory: {output_dir}")
    print("=" * 60)

    # 1. Execute Crawler & DOM/CSS/JS Inspection
    crawler = WebsiteMotionCrawler(
        target_url=target_url,
        output_dir=output_dir,
        headless=headless
    )
    raw_data = crawler.run_full_inspection()

    # 2. Execute OpenCV Video & Frame Motion Analysis
    video_path = raw_data.get("video_recording_path")
    frame_analysis_report = {
        "video_available": False,
        "frames_extracted": 0,
        "motion_metrics": [],
        "contact_sheet": None,
        "diff_highlights": []
    }

    if video_path and os.path.exists(video_path):
        print("\n[FrameAnalyzer] Analyzing recorded video with OpenCV...")
        frame_analysis_report["video_available"] = True
        frame_analysis_report["video_path"] = video_path

        # Extract up to 24 frames at 0.5s intervals
        extracted_frames = extract_frames(video_path, sample_interval_sec=0.5, max_frames=24)
        frame_analysis_report["frames_extracted"] = len(extracted_frames)
        print(f"[FrameAnalyzer] Extracted {len(extracted_frames)} frames.")

        if extracted_frames:
            # Generate Contact Sheet
            contact_sheet_path = os.path.join(output_dir, "recordings", "motion_contact_sheet.png")
            create_contact_sheet(extracted_frames, contact_sheet_path, cols=4, thumb_width=340)
            frame_analysis_report["contact_sheet"] = contact_sheet_path
            print(f"[FrameAnalyzer] Saved contact sheet: {contact_sheet_path}")

            # Compute Motion Metrics
            motion_metrics = compute_frame_motion_metrics(extracted_frames)
            frame_analysis_report["motion_metrics"] = motion_metrics

            # Find peak visual movement transitions
            sorted_by_change = sorted(motion_metrics, key=lambda m: m["change_percentage"], reverse=True)
            peak_transitions = [m for m in sorted_by_change if m["movement_detected"]][:3]

            for idx, peak in enumerate(peak_transitions):
                # Find matching frame indices
                t1 = peak["from_time_sec"]
                t2 = peak["to_time_sec"]
                f1 = next((f for t, f in extracted_frames if t == t1), None)
                f2 = next((f for t, f in extracted_frames if t == t2), None)

                if f1 is not None and f2 is not None:
                    diff_path = os.path.join(output_dir, "recordings", f"motion_peak_{idx+1}_diff.png")
                    create_motion_highlight_diff(f1, f2, diff_path)
                    frame_analysis_report["diff_highlights"].append({
                        "peak_rank": idx + 1,
                        "from_sec": t1,
                        "to_sec": t2,
                        "change_percentage": peak["change_percentage"],
                        "diff_image": diff_path
                    })
                    print(f"[FrameAnalyzer] Saved peak motion diff #{idx+1} ({peak['change_percentage']}% change): {diff_path}")

    # 3. Consolidate into structured summary report
    summary = {
        "target_url": target_url,
        "title": raw_data.get("metadata", {}).get("title"),
        "sections_detected": len(raw_data.get("sections", [])),
        "css_animated_elements_count": len(raw_data.get("css_analysis", {}).get("animatedElements", [])),
        "css_transition_elements_count": len(raw_data.get("css_analysis", {}).get("transitionElements", [])),
        "keyframes_defined_count": len(raw_data.get("css_analysis", {}).get("keyframes", [])),
        "web_animations_count": len(raw_data.get("js_analysis", {}).get("webAnimations", [])),
        "detected_libraries": raw_data.get("js_analysis", {}).get("librariesDetected", {}),
        "visual_engines": raw_data.get("js_analysis", {}).get("visualEngines", {}),
        "button_interactions_count": len(raw_data.get("button_interactions", [])),
        "card_interactions_count": len(raw_data.get("card_interactions", [])),
        "contact_form_detected": raw_data.get("contact_form", {}).get("found", False),
        "frame_analysis": frame_analysis_report
    }

    summary_path = os.path.join(output_dir, "reports", "motion_summary.json")
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)
    print(f"\n[Runner] Analysis complete! Consolidated summary saved to: {summary_path}")
    print("=" * 60)

    return summary


def main():
    parser = argparse.ArgumentParser(description="MRK AI - Website Motion Analyzer")
    parser.add_argument("--url", default="https://ali-and-ai.com/", help="Target website URL")
    parser.add_argument("--output", default="captures", help="Output directory")
    parser.add_argument("--headful", action="store_true", help="Run browser in headful mode")
    args = parser.parse_args()

    run_analysis(
        target_url=args.url,
        output_dir=args.output,
        headless=not args.headful
    )


if __name__ == "__main__":
    main()
