export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  badge: string;
  capabilities: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "workflow-automation",
    title: "AI Workflow Automation",
    shortDesc: "Automate repetitive manual operations and link disconnected business systems.",
    longDesc: "We design robust end-to-end automation pipelines connecting your CRMs, databases, email tools, and internal apps via high-reliability webhooks and APIs.",
    iconName: "Workflow",
    badge: "Core Automation",
    capabilities: [
      "Automate repetitive business operations",
      "Connect applications and services seamlessly",
      "Build API, webhook, and trigger-based workflows",
      "Eliminate manual data transfer bottlenecks"
    ]
  },
  {
    id: "customer-support-agents",
    title: "AI Customer Support Agents",
    shortDesc: "24/7 intelligent conversational agents trained on your business knowledge.",
    longDesc: "Transform customer communication with responsive AI agents that understand context, answer complex FAQs, and resolve queries instantly with zero queue time.",
    iconName: "Bot",
    badge: "Customer Experience",
    capabilities: [
      "AI-powered multi-channel customer conversations",
      "Automated FAQ and policy inquiry resolution",
      "Knowledge-based contextual responses",
      "Smart human escalation protocols"
    ]
  },
  {
    id: "ai-voice-agents",
    title: "AI Voice Agents",
    shortDesc: "Natural conversational voice assistants handling customer phone calls.",
    longDesc: "Deploy ultra-low latency voice agents that sound human, answer inbound inquiries, book appointments, and gather caller details without holding lines.",
    iconName: "PhoneCall",
    badge: "Voice AI",
    capabilities: [
      "Natural-sounding real-time voice interactions",
      "Automated inbound call qualification",
      "Appointment scheduling & enquiry logging",
      "High-concurrency telephone handling"
    ]
  },
  {
    id: "custom-ai-agents",
    title: "Custom AI Agents",
    shortDesc: "Task-oriented agents equipped with external tools, logic, and memory.",
    longDesc: "Custom autonomous agents built to perform multi-step business tasks — from internet research and document synthesis to database auditing and workflow execution.",
    iconName: "Cpu",
    badge: "Agentic Systems",
    capabilities: [
      "Multi-step task-oriented agent workflows",
      "External tool integration and API orchestration",
      "Dynamic decision trees with error self-correction",
      "Autonomous scheduling and task execution"
    ]
  },
  {
    id: "rag-knowledge-systems",
    title: "RAG & Knowledge Systems",
    shortDesc: "Turn internal documents, PDFs, and manuals into interactive intelligence.",
    longDesc: "Harness Retrieval-Augmented Generation (RAG) and high-speed vector databases to query company docs, standard operating procedures, and technical libraries instantly.",
    iconName: "Database",
    badge: "Information Retrieval",
    capabilities: [
      "Document-based question answering with citations",
      "Hybrid vector & semantic retrieval (Qdrant / Chroma)",
      "Intelligent knowledgebase copilots for teams",
      "Strict data privacy & zero external model training"
    ]
  },
  {
    id: "ai-creative-services",
    title: "AI Creative Services",
    shortDesc: "High-impact visual assets, AI video generation, and brand aesthetics.",
    longDesc: "Leverage cutting-edge generative AI models to create bespoke visual designs, promotional video content, and marketing imagery aligned with your brand identity.",
    iconName: "Sparkles",
    badge: "Generative Creative",
    capabilities: [
      "AI-driven video generation & motion graphics",
      "High-conversion social media visual content",
      "AI-powered branding & visual design assets",
      "Rapid creative experimentation & concept art"
    ]
  },
  {
    id: "video-editing-production",
    title: "Video Editing & Content Production",
    shortDesc: "Polished promotional videos, short-form reels, and storytelling.",
    longDesc: "Complete post-production combining human creative direction with AI enhancement tools to deliver high-retention video content for YouTube, Instagram, and web.",
    iconName: "Video",
    badge: "Production Studio",
    capabilities: [
      "Short-form social media video editing (Reels/Shorts)",
      "High-production brand showcase & product reels",
      "Dynamic typography, pacing, and sound design",
      "Multi-platform format optimization"
    ]
  }
];
