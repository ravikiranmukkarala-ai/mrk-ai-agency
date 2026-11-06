export type ProjectStatus = 'Prototype' | 'Framework Experiment' | 'Technical Showcase' | 'Research Prototype';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  statusColor: string;
  summary: string;
  architecture: string[];
  techStack: string[];
  keyHighlights: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "multimodal-video-rag",
    title: "Multimodal Video RAG",
    category: "Retrieval-Augmented Generation",
    status: "Research Prototype",
    statusColor: "border-cyan-400/40 text-cyan-300 bg-cyan-950/30",
    summary: "An intelligent video indexing engine that enables precise question answering across long video content with exact timestamp references.",
    architecture: [
      "OpenCV video frame extraction at semantic scene cuts",
      "Whisper audio transcription & time-aligned subtitle mapping",
      "Dual visual and textual embedding generation (CLIP / Text)",
      "High-dimensional vector storage and retrieval via Qdrant"
    ],
    techStack: ["Python", "Qdrant", "OpenCV", "Whisper", "CLIP", "LangChain"],
    keyHighlights: [
      "Exact timestamp jump to relevant video moments",
      "Cross-modal semantic search across spoken audio & visuals",
      "Handles 60+ minute instructional videos and technical demos"
    ]
  },
  {
    id: "agentic-bi",
    title: "Agentic Business Intelligence",
    category: "Autonomous Multi-Agent Systems",
    status: "Prototype",
    statusColor: "border-indigo-400/40 text-indigo-300 bg-indigo-950/30",
    summary: "A natural-language data copilot that converts plain English questions into verified SQL queries, data summaries, and executive reports.",
    architecture: [
      "LangGraph cyclic graph state management & reasoning loop",
      "Schema-aware SQL generation and dry-run query validator",
      "Hybrid document-based RAG for financial and operational glossaries",
      "Automated charting and executive bullet synthesis"
    ],
    techStack: ["LangGraph", "Python", "PostgreSQL", "OpenAI APIs", "FastAPI"],
    keyHighlights: [
      "Zero manual SQL writing required for non-technical managers",
      "Self-correcting query retry loop on database syntax errors",
      "Unified intelligence across structured databases and PDF docs"
    ]
  },
  {
    id: "ai-visual-search",
    title: "AI Image & Visual Search Engine",
    category: "Computer Vision & Vector Search",
    status: "Technical Showcase",
    statusColor: "border-teal-400/40 text-teal-300 bg-teal-950/30",
    summary: "Semantic image retrieval system allowing users to search visual catalogs using natural language descriptions without manual tagging.",
    architecture: [
      "CLIP visual-language embedding projection model",
      "Sub-50ms Approximate Nearest Neighbor (ANN) vector lookups",
      "Metadata filtering for catalog category, price, and attributes",
      "Batch image ingestion pipeline with auto-resizing"
    ],
    techStack: ["CLIP", "ChromaDB", "Python", "FastAPI", "React"],
    keyHighlights: [
      "Searches images by conceptual aesthetics ('minimal dark tech watch')",
      "Replaces tedious manual tagging with instant zero-shot embeddings",
      "Scalable to tens of thousands of catalog assets"
    ]
  },
  {
    id: "automation-experiments",
    title: "AI Automation Workflows & Agent Lab",
    category: "Workflow Engineering",
    status: "Framework Experiment",
    statusColor: "border-blue-400/40 text-blue-300 bg-blue-950/30",
    summary: "A collection of practical webhook and API automation prototypes designed to handle lead intake, invoice parsing, and inbox triage.",
    architecture: [
      "Multi-step asynchronous webhook listener infrastructure",
      "LLM parsing pipelines converting unformatted text into JSON schemas",
      "Automated exception handling and fallback communication alerts",
      "Multi-platform dispatch to email, messaging, and internal sheets"
    ],
    techStack: ["Python", "FastAPI", "Webhooks", "JSON Schema", "REST APIs"],
    keyHighlights: [
      "Autonomous lead sorting and priority classification",
      "Zero-latency webhook handoffs across disparate tools",
      "Transparent execution logs with full audit trail"
    ]
  }
];
