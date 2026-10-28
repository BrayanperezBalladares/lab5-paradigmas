const assert = require('assert');

const { validateSubmission } = require('../chat-policy');
const result = validateSubmission('Ana', 'x'.repeat(281));
assert.equal(result.accepted, false);
assert.equal(result.message, 'x'.repeat(281));
assert.match(result.reason, /demasiado largo/);
console.log('REQ-012 passed');
