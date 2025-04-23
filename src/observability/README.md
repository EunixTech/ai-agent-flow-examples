# 📊 Observability Example

This example demonstrates how to integrate:

- ✅ Structured logging with `winston`
- 📈 Metrics collection with `prom-client`
- 🌐 `/metrics` endpoint for Prometheus scraping

## Run the Example

```bash
npm install
npx ts-node examples/observability/index.ts
```

Then visit: http://localhost:3001/metrics

## What You’ll See

- Node executions logged to the console
- A Prometheus /metrics endpoint with:
- node_execution_total
- flow_duration_seconds

## Concepts Covered

- winston for real-time JSON logging
- prom-client for exposing metrics
- Flow and node instrumentation
