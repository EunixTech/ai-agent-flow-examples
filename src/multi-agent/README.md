# Multi-Agent Example

Shows two agents communicating through a `MessageBus`.

## Setup

1. Install and start a Redis server. You can use Docker:

   ```bash
   docker run -p 6379:6379 -d redis
   ```

2. Set the `REDIS_URL` environment variable to your Redis instance (defaults to
   `redis://localhost:6379`):

   ```bash
   export REDIS_URL=redis://localhost:6379
   ```

If `REDIS_URL` is not defined or Redis is unavailable, the example falls back to
the in-memory `MessageBus`.

```bash
npm run example src/multi-agent/index.ts
```
