const assert = require('assert');

const { validateSubmission } = require('../chat-policy');
const result = validateSubmission('Ana', '   ');
assert.equal(result.accepted, false);
assert.equal(result.message, '');
assert.match(result.reason, /Escriba algo/);
console.log('REQ-010 passed');
