import { expect } from 'chai';
import { describe, it } from 'mocha';
process.env.OPENAI_API_KEY = 'dummy';
import { start } from '../src/observability/index';

describe('observability start', () => {
  it('runs the flow and closes the server', async () => {
    const { server, runPromise } = start();
    const result = await runPromise;
    expect(result).to.deep.equal({
      type: 'success',
      output: 'Flow completed'
    });
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });
});
