/**
 * AI Agent Sandbox Service.
 * Simulates multi-stage autonomous agent execution for Phase 1.
 * Ready for drop-in LLM API connection (OpenAI / Gemini / LangGraph) in Phase 2.
 */

export interface AgentStageLog {
  id: string;
  stageName: string;
  status: 'pending' | 'in_progress' | 'completed';
  timestamp: string;
  details: string[];
}

export interface SimulationResult {
  taskId: string;
  query: string;
  stages: AgentStageLog[];
  automationPlan: {
    title: string;
    trigger: string;
    toolsUsed: string[];
    steps: string[];
    estimatedSavedHoursMonthly: string;
    confidenceScore: number;
  };
}

export const PRESET_AGENT_PROMPTS = [
  "Organize my new customer enquiries from Gmail and WhatsApp",
  "Automate weekly client reporting with SQL and AI summaries",
  "Build a 24/7 AI voice receptionist to qualify inbound leads",
  "Extract structured invoice data from PDFs into our accounting tool"
];

export async function simulateAgentExecution(
  query: string,
  onProgress?: (stageIndex: number, log: AgentStageLog) => void
): Promise<SimulationResult> {
  const taskId = `MRK-${Math.floor(1000 + Math.random() * 9000)}`;

  // Define the 5 autonomous stages
  const stageTemplates = [
    {
      stageName: "Analyzing Business Request",
      details: [
        `Parsing user intent from prompt: "${query.slice(0, 50)}..."`,
        "Identifying input data sources, triggers, and expected business outputs.",
        "Validating constraint parameters: Zero human bottleneck, 24/7 uptime."
      ]
    },
    {
      stageName: "Identifying Required Tools & Connectors",
      details: [
        "Querying Tool Registry for active API connectors.",
        "Selected toolchain: Webhook Trigger, LLM Classifier, Vector Store, Notification Service.",
        "Establishing authentication boundaries & error retry fallbacks."
      ]
    },
    {
      stageName: "Designing Autonomous Workflow Logic",
      details: [
        "Constructing directed acyclic graph (DAG) execution pipeline.",
        "Configuring conditional branch: Urgent Enquiry vs Standard Lead vs Support Ticket.",
        "Inserting human-in-the-loop review threshold for high-value contracts."
      ]
    },
    {
      stageName: "Synthesizing Execution Plan",
      details: [
        "Compiling JSON workflow schema and webhook listener payload.",
        "Simulating edge cases: API rate limits, malformed payloads, off-hours response.",
        "Verification passed: 100% deterministic routing logic generated."
      ]
    },
    {
      stageName: "Deployment Ready & Blueprint Active",
      details: [
        "Pipeline initialized in MRK AI Sandbox environment.",
        "Ready for immediate production webhook binding in Phase 2."
      ]
    }
  ];

  const stages: AgentStageLog[] = [];

  for (let i = 0; i < stageTemplates.length; i++) {
    const t = stageTemplates[i];
    const log: AgentStageLog = {
      id: `stage-${i + 1}`,
      stageName: t.stageName,
      status: 'in_progress',
      timestamp: new Date().toLocaleTimeString(),
      details: t.details
    };

    if (onProgress) {
      onProgress(i, log);
    }

    // Realistic simulation delay per stage (400ms - 600ms)
    await new Promise(resolve => setTimeout(resolve, 450));

    log.status = 'completed';
    stages.push(log);
  }

  // Generate structured output
  return {
    taskId,
    query,
    stages,
    automationPlan: {
      title: `Intelligent Pipeline: ${query.split(' ').slice(0, 5).join(' ')}...`,
      trigger: "Instant Webhook Event (Email / Form / WhatsApp API)",
      toolsUsed: ["FastAPI Webhook Listener", "LLM Parser", "Qdrant Vector DB", "CRM API"],
      steps: [
        "1. Capture raw event payload within <120ms of arrival",
        "2. Parse & extract customer profile, intent classification & urgency score",
        "3. Cross-reference internal knowledgebase for instant contextual answering",
        "4. Dispatch personalized reply & sync lead record directly to team dashboard"
      ],
      estimatedSavedHoursMonthly: "35–50 hrs / month",
      confidenceScore: 98.4
    }
  };
}
