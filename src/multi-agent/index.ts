import { Flow, Runner, Context, MessageBus } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';

const bus = new MessageBus();

bus.subscribe('agent2', (sender, message) => {
  console.log(`Agent2 received from ${sender}: ${message}`);
});

const sendNode = new ActionNode('send', async () => {
  bus.send('agent1', 'agent2', 'Hello from agent1');
  return { type: 'success', output: 'sent' };
});

const flow = new Flow('agent1-flow').addNode(sendNode).setStartNode('send');

async function run() {
  const context: Context = { conversationHistory: [], data: {}, metadata: {} };
  const runner = new Runner();
  const result = await runner.runFlow(flow, context);
  console.log('Agent1 result:', result);
}

run().catch(console.error);
