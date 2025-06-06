import express from 'express';
import { Flow, Runner, Context } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';
import { Server } from 'http';

const greetNode = new ActionNode('greet', async () => ({
  type: 'success',
  output: 'Hello from Express!',
}));

const flow = new Flow('express-flow').addNode(greetNode).setStartNode('greet');

const runner = new Runner();

function createApp() {
  const app = express();
  app.get('/flow', async (_req, res) => {
    const context: Context = { conversationHistory: [], data: {}, metadata: {} };
    const result = await runner.runFlow(flow, context);
    res.json(result);
  });
  return app;
}

export function startServer(port = 3000): Server {
  const app = createApp();
  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/flow`);
  });
  return server;
}
