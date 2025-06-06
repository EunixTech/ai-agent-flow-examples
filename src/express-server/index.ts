import express from 'express';
import { Flow, Runner, Context } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';

const greetNode = new ActionNode('greet', async () => ({
  type: 'success',
  output: 'Hello from Express!',
}));

const flow = new Flow('express-flow').addNode(greetNode).setStartNode('greet');

const runner = new Runner();

const app = express();
app.get('/flow', async (_req, res) => {
  const context: Context = { conversationHistory: [], data: {}, metadata: {} };
  const result = await runner.runFlow(flow, context);
  res.json(result);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/flow');
});
