import { Flow, Runner, Context } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';

async function main() {
  const startNode = new ActionNode('start', async () => ({
    type: 'success',
    output: 'Starting',
    action: 'next',
  }));

  const endNode = new ActionNode('end', async () => ({
    type: 'success',
    output: 'Finished',
  }));

  const flow = new Flow('debug-flow')
    .addNode(startNode)
    .addNode(endNode)
    .setStartNode('start')
    .addTransition('start', { action: 'next', to: 'end' });

  const context: Context = { conversationHistory: [], data: {}, metadata: {} };

  const runner = new Runner();
  runner.onUpdate((update) => console.log('Update:', update));

  const result = await runner.runFlow(flow, context);
  console.log('Result:', result);
}

main().catch(console.error);
