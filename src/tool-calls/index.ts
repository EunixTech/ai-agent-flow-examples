import { Flow, Runner, Context } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';

async function main() {
  const toolNode = new ActionNode('tool', async (context) => {
    const raw = context.data.name;
    const name = typeof raw === 'string' ? raw : 'unknown';
    return { type: 'success', output: name.toUpperCase() };
  });

  const flow = new Flow('tool-flow').addNode(toolNode).setStartNode('tool');

  const context: Context = {
    conversationHistory: [],
    data: { name: 'Codex' },
    metadata: {},
  };

  const runner = new Runner();
  const result = await runner.runFlow(flow, context);
  console.log(result);
}

main().catch(console.error);
