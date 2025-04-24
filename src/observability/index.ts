// observability/index.ts
import { Flow, Runner } from 'ai-agent-flow';
import { ActionNode } from 'ai-agent-flow/nodes/action';
import winston from 'winston';
import client from 'prom-client';
import express from 'express';

// 📝 Setup Winston Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

// 📈 Setup Prometheus Metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const flowRunCounter = new client.Counter({
  name: 'flow_runs_total',
  help: 'Total number of flow runs',
});
register.registerMetric(flowRunCounter);

// Create context
const context = {
  conversationHistory: [],
  data: {},
  metadata: {}
};

// ⚙️ Create Simple Flow
const greetNode = new ActionNode('greet', async (context) => {
  logger.info('Executing greet node...');
  return { type: 'success', output: 'Hello from the observable world!' };
});

const flow = new Flow('observable-flow')
  .addNode(greetNode)
  .setStartNode('greet');

// 🚀 Run the Flow
const run = async () => {
  logger.info('Starting flow...');
  flowRunCounter.inc();

  const runner = new Runner();
  const result = await runner.runFlow(flow, context);

  logger.info(`Flow result: ${JSON.stringify(result)}`);
  console.log(result);
};

// 🧪 Start Metrics Server
const app = express();
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(9100, () => {
  logger.info('Prometheus metrics available at http://localhost:9100/metrics');
  run();
});
