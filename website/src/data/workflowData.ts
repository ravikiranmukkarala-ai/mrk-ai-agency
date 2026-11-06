export interface WorkflowStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  outputs: string[];
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: "01",
    title: "Discover",
    subtitle: "Problem Audit & Scope",
    description: "We analyze your existing operations, pinpoint manual time sinks, and define clear technical goals for automation.",
    iconName: "Search",
    outputs: ["Bottleneck audit", "Automation feasibility report", "Technical architecture scope"]
  },
  {
    step: "02",
    title: "Design",
    subtitle: "Workflow & AI Blueprint",
    description: "We map out the data flows, choose appropriate models and vector tools, and construct the execution blueprint.",
    iconName: "PenTool",
    outputs: ["Data flow diagrams", "Tool & model selection", "Fail-safe logic mapping"]
  },
  {
    step: "03",
    title: "Build",
    subtitle: "Development & Integration",
    description: "We build the custom agents, configure webhooks, integrate APIs, and link your platforms into an interconnected engine.",
    iconName: "Code2",
    outputs: ["Custom agent code", "API & Webhook pipelines", "Zero-downtime deployment"]
  },
  {
    step: "04",
    title: "Optimize",
    subtitle: "Benchmarking & Refinement",
    description: "We conduct stress tests, measure response accuracy, fine-tune prompts, and ensure seamless ongoing operation.",
    iconName: "Sliders",
    outputs: ["Accuracy verification", "Latency optimization", "Documentation & handoff"]
  }
];
