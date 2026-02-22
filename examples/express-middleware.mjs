// Express middleware pattern for API compliance checking
// Run: node examples/express-middleware.mjs
//
// This is an example pattern — it doesn't start a server.
// Copy the middleware into your Express app.

import { analyzeCompliance, overallSummary } from '../sdk/src/index.js';

/**
 * Express middleware that checks compliance before processing.
 * Attach to routes that accept user descriptions of their use case.
 *
 * Usage:
 *   app.post('/api/check', complianceCheck, (req, res) => {
 *     res.json(req.compliance);
 *   });
 */
function complianceCheck(req, res, next) {
  const { description } = req.body || {};

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Missing "description" in request body' });
  }

  const findings = analyzeCompliance(description);
  const summary = overallSummary(findings);

  req.compliance = { findings, summary };
  next();
}

// --- Demo (no server needed) ---

// Simulate a request
const mockReq = {
  body: { description: 'resell OpenAI API access as a white-label product' },
};
const mockRes = {
  status(code) { this.statusCode = code; return this; },
  json(data) { this.data = data; },
};

complianceCheck(mockReq, mockRes, () => {
  console.log('Compliance check result:');
  console.log(JSON.stringify(mockReq.compliance.summary, null, 2));
  console.log(`\n${mockReq.compliance.findings.length} finding(s) for ${[...new Set(mockReq.compliance.findings.map(f => f.provider))].join(', ')}`);
});
