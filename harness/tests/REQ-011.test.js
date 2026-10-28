const assert = require('assert');

const { validateSubmission } = require('../chat-policy');
const result = validateSubmission('  ', 'Hola');
assert.equal(result.accepted, false);
assert.equal(result.message, 'Hola');
assert.match(result.reason, /Escriba un nombre/);
console.log('REQ-011 passed');
