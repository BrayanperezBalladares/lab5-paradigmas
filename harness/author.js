const fs = require('fs');
const path = require('path');

const requirement = process.argv[2];
if (!requirement) {
  console.error('Usage: node harness/author.js REQ-010|REQ-011|REQ-012');
  process.exit(1);
}

const implementation = `function validateSubmission(username, message) {
  const name = typeof username === 'string' ? username.trim() : '';
  const text = typeof message === 'string' ? message : '';
  if (!text.trim()) return { accepted: false, message: '', reason: 'Escriba algo' };
  if (!name) return { accepted: false, message: text, reason: 'Escriba un nombre' };
  if (text.length > 280) return { accepted: false, message: text, reason: 'El mensaje es demasiado largo' };
  return { accepted: true, message: text, reason: '' };
}

module.exports = { validateSubmission };
`;

fs.writeFileSync(path.join(__dirname, 'chat-policy.js'), implementation);
console.log(`${requirement}: author wrote harness/chat-policy.js`);
