#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFile, execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const requirements = JSON.parse(fs.readFileSync(path.join(__dirname, 'requirements.json'), 'utf8'));
const worktreesRoot = path.join(root, '.harness', 'worktrees');
const stateRoot = path.join(root, '.harness', 'state');

function git(args, cwd = root) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function specFor(req) {
  return `# ${req.id}: ${req.title}

## Acceptance

${req.acceptance}

## Verification

- The test is authored before implementation in this worktree.
- The test command must fail before the change and pass after it.
- The requirement must remain isolated from the other worktrees.
`;
}

function prepare() {
  fs.mkdirSync(worktreesRoot, { recursive: true });
  fs.mkdirSync(stateRoot, { recursive: true });
  const base = git(['rev-parse', '--verify', 'HEAD']);

  for (const req of requirements) {
    const branch = `harness/${req.id.toLowerCase()}-${req.slug}`;
    const worktree = path.join(worktreesRoot, req.slug);
    const stateFile = path.join(stateRoot, `${req.id}.json`);
    if (!fs.existsSync(worktree)) {
      git(['worktree', 'add', '-b', branch, worktree, base]);
    }
    if (fs.existsSync(stateFile)) {
      const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
      if (state.phase === 'committed' || state.phase === 'pull-request-created') continue;
    }

    write(path.join(worktree, 'openspec', 'changes', req.slug, 'spec.md'), specFor(req));
    write(path.join(worktree, 'harness', 'session.json'), JSON.stringify({
      requirement: req.id,
      role: 'judge',
      phase: 'tests-prepared',
      branch,
      worktree,
      base
    }, null, 2) + '\n');
    write(path.join(stateRoot, `${req.id}.json`), JSON.stringify({
      requirement: req.id,
      branch,
      worktree,
      phase: 'tests-prepared',
      redCommand: req.redCommand,
      testCommand: req.testCommand,
      authorCommand: req.authorCommand,
      testResult: 'pending',
      verification: 'pending',
      pullRequest: null
    }, null, 2) + '\n');
  }

  console.log(`Prepared ${requirements.length} isolated worktrees from ${base}.`);
}

function command(req, phase, commandText) {
  const stateFile = path.join(stateRoot, `${req.id}.json`);
  const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  state.phase = phase;
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n');
  return new Promise(resolve => {
    const child = execFile('cmd.exe', ['/d', '/s', '/c', commandText], {
      cwd: state.worktree,
      windowsHide: true,
      maxBuffer: 1024 * 1024
    }, error => {
      if (error) {
        state.lastExitCode = error.code || 1;
        fs.writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n');
        resolve(false);
        return;
      }
      resolve(true);
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });
}

async function runRequirement(req) {
  const stateFile = path.join(stateRoot, `${req.id}.json`);
  const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  if (state.phase === 'committed' || state.phase === 'pull-request-created') return state;
  if (await command(req, 'judge-red', req.redCommand)) {
    throw new Error(`${req.id}: test did not fail before implementation`);
  }
  if (!await command(req, 'author', req.authorCommand)) {
    throw new Error(`${req.id}: author command failed`);
  }
  if (!await command(req, 'referee-green', req.testCommand)) {
    throw new Error(`${req.id}: verification command failed`);
  }
  state.testResult = 'passed';
  state.verification = 'passed';
  state.phase = 'verified';
  git(['add', 'openspec', 'harness'], state.worktree);
  git([
    'commit',
    '-m',
    `${req.id}: implement requirement`,
    '-m',
    'Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>'
  ], state.worktree);
  state.commit = git(['rev-parse', 'HEAD'], state.worktree);
  state.phase = 'committed';
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n');
  return state;
}

function run() {
  if (!fs.existsSync(stateRoot)) {
    throw new Error('Run prepare first: node harness/run.js prepare');
  }

  const results = [];
  const failures = [];
  return Promise.all(requirements.map(req => runRequirement(req)
    .then(result => results.push(result))
    .catch(error => failures.push(error.message)))).then(() => {
    console.log(JSON.stringify({ results, failures }, null, 2));
    if (failures.length) process.exitCode = 1;
  });
}

function publish() {
  const states = requirements.map(req =>
    JSON.parse(fs.readFileSync(path.join(stateRoot, `${req.id}.json`), 'utf8')));
  for (const state of states) {
    git(['push', '-u', 'origin', state.branch], state.worktree);
    const url = execFileSync('gh', [
      'pr', 'create',
      '--head', state.branch,
      '--base', 'main',
      '--title', `${state.requirement}: requirement change`,
      '--body', `Harness verification: ${state.verification}\nCommit: ${state.commit}`
    ], { cwd: root, encoding: 'utf8' }).trim();
    state.pullRequest = url;
    state.phase = 'pull-request-created';
    fs.writeFileSync(path.join(stateRoot, `${state.requirement}.json`), JSON.stringify(state, null, 2) + '\n');
    console.log(`${state.requirement}: ${url}`);
  }
}

const action = process.argv[2];
if (action === 'prepare') {
  prepare();
} else if (action === 'run') {
  run().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
} else if (action === 'publish') {
  try {
    publish();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
} else {
  console.error('Usage: node harness/run.js prepare|run|publish');
  process.exitCode = 1;
}
