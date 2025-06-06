import { strict as assert } from 'assert';
import { describe, it, before, after } from 'mocha';

let startServer: any;

describe('express server', function () {
  let server: any;
  before(() => {
    process.env.OPENAI_API_KEY = 'dummy';
    ({ startServer } = require('../src/express-server/index.ts'));
    server = startServer(3001);
  });

  after(() => {
    server.close();
  });

  it('returns flow result', async function () {
    const response = await fetch('http://localhost:3001/flow');
    const json = await response.json();
    assert.equal(json.type, 'success');
  });
});
