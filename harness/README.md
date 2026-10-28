# Local agentic harness

This is a small, host-neutral demonstration of the OpenSpec/FoFo workflow:

1. `prepare` creates one Git branch and worktree per requirement.
2. Each worktree receives its own OpenSpec contract and session state.
3. `run` proves the Judge test is red, invokes the Author, and runs the
   independent verification command.
4. `.harness/state/REQ-*.json` is the persistent resume/evidence record.

The harness does not invent a passing result. A command must exit with code
zero before the state becomes `verified`.

## Demo

From the repository root:

```powershell
node harness/run.js prepare
node harness/run.js run
```

The three worktrees are created under `.harness/worktrees/`. They are local
branches and can be opened in three sessions independently.

The checked-in demo uses a tiny policy module as the Author output. Replace
`redCommand`, `authorCommand`, and `testCommand` in `requirements.json` with
OpenSpec/FoFo commands for a real agent run. They execute inside the
corresponding worktree, so test authorship and implementation do not share an
untracked working directory.
