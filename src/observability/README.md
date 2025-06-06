# 📊 Observability Example

This example demonstrates how to integrate observability features into your AI agent flows:

- ✅ Structured logging with `winston`
- 📈 Metrics collection with `prom-client`
- 🌐 Express server with `/metrics` endpoint for Prometheus scraping

## Run the Example

```bash
npm install
npx ts-node src/observability/index.ts
```

Then visit: http://localhost:9100/metrics

### Programmatic Usage

You can also start the server from your own code:

```ts
import { start } from './src/observability/index';

const { server, runPromise } = start();
await runPromise;
server.close();
```

## What You'll See

- Node executions logged to the console with Winston
- A Prometheus-compatible `/metrics` endpoint with:
  - `flow_runs_total` counter
  - Default Node.js metrics (memory, CPU, etc.)

## Code Overview

The example creates a simple flow with a single node that:
1. Logs execution information using Winston
2. Increments a Prometheus counter for each flow run
3. Exposes metrics via an Express server

## Key Concepts

- **Winston Logger**: Configured for console output with simple formatting
- **Prometheus Metrics**: Using `prom-client` to track flow executions
- **Express Server**: Lightweight server to expose metrics endpoint
- **Flow Instrumentation**: Adding observability to your flows without changing core logic

## Extending This Example

You can enhance this example by:
- Adding custom metrics for specific node types
- Implementing more detailed logging
- Adding tracing with OpenTelemetry
- Creating dashboards with Grafana
