export interface TechItem {
  name: string;
  category: 'Frameworks & Orchestration' | 'Vector Databases & Storage' | 'Models & APIs' | 'Frontend & Integration';
  description: string;
  useCase: string;
}

export const TECH_STACK_DATA: TechItem[] = [
  {
    name: "Python",
    category: "Frameworks & Orchestration",
    description: "Core programming language for backend data pipelines, model orchestration, and asynchronous tasks.",
    useCase: "Agent logic, backend APIs, data parsers"
  },
  {
    name: "LangGraph",
    category: "Frameworks & Orchestration",
    description: "Stateful, cyclic multi-actor agent orchestration framework with checkpoints and branching logic.",
    useCase: "Autonomous decision graphs and multi-step agents"
  },
  {
    name: "LangChain",
    category: "Frameworks & Orchestration",
    description: "Extensive toolkits and integration wrappers for LLMs, prompt management, and document loaders.",
    useCase: "Prompt chains, tool binding, document parsing"
  },
  {
    name: "Qdrant",
    category: "Vector Databases & Storage",
    description: "High-performance vector similarity search engine optimized for production embeddings.",
    useCase: "Multimodal Video RAG, high-scale semantic search"
  },
  {
    name: "ChromaDB",
    category: "Vector Databases & Storage",
    description: "Lightweight, developer-friendly open-source embedding database for agile prototyping.",
    useCase: "Local knowledgebase querying, rapid vector tests"
  },
  {
    name: "RAG Architecture",
    category: "Vector Databases & Storage",
    description: "Retrieval-Augmented Generation methodology connecting LLMs with private factual repositories.",
    useCase: "Hallucination-free document Q&A and policy assistants"
  },
  {
    name: "OpenAI APIs",
    category: "Models & APIs",
    description: "State-of-the-art language reasoning, structured JSON outputs, and embedding models.",
    useCase: "Classification, reasoning agents, summarization"
  },
  {
    name: "Gemini",
    category: "Models & APIs",
    description: "Google's multimodal large language models with massive context windows for video and long text.",
    useCase: "Multimodal analysis, extensive document synthesis"
  },
  {
    name: "Hugging Face",
    category: "Models & APIs",
    description: "Open-source ecosystem for specialized models, transformers, tokenizers, and embeddings.",
    useCase: "Open-source embeddings, CLIP visual search models"
  },
  {
    name: "React & TypeScript",
    category: "Frontend & Integration",
    description: "Type-safe, component-driven frontend architecture for responsive interfaces and dashboards.",
    useCase: "High-performance client UI, interactive agent terminals"
  },
  {
    name: "APIs & Webhooks",
    category: "Frontend & Integration",
    description: "RESTful architecture, event-driven webhooks, and asynchronous HTTP payload handlers.",
    useCase: "Connecting disjoint business tools into unified flows"
  },
  {
    name: "Automation Toolchains",
    category: "Frontend & Integration",
    description: "Modern integration utilities and workflow engines for reliable data sync.",
    useCase: "Lead triage, CRM sync, scheduled batch jobs"
  }
];
