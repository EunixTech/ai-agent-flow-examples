import { Flow, Runner } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';

async function main() {
  const helloNode = new ActionNode('start', async () => ({
    type: 'success',
    output: 'Hello world'
  }));

  const flow = new Flow('quick-start')
    .addNode(helloNode)
    .setStartNode('start');

  const context = { conversationHistory: [], data: {}, metadata: {} };
  const result = await new Runner().runFlow(flow, context);
  console.log(result);
}

main().catch(console.error);
