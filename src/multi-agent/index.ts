import dotenv from 'dotenv';
dotenv.config();
import { Flow, Runner, Context, MessageBus } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';
import { RedisMessageBus } from 'ai-agent-flow/utils/redis-message-bus';

let bus: MessageBus;
if (process.env.REDIS_URL) {
  try {
    bus = new RedisMessageBus({ url: process.env.REDIS_URL });
  } catch (err) {
    console.warn(
      'Failed to connect to Redis, falling back to in-memory MessageBus',
      err
    );
    bus = new MessageBus();
  }
} else {
  bus = new MessageBus();
}

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
