---
name: ToyRobot SOLID Fix Draft (Top 3)
overview: Convert the SOLID audit into an implementation-ready, incremental draft for the top 3 issues with concise before/after snippets, test updates, and PR sequencing.
todos:
  - id: pr1-parser-srp-ocp
    content: Introduce parser handler registry and unify PLACE parsing helper
    status: pending
  - id: pr2-output-boundary
    content: Move output side effects from transitions/parser default into boundary presenter
    status: pending
  - id: pr3-direction-typing
    content: Narrow RobotState.direction to Directions and update boundary parsing/types
    status: pending
isProject: false
---

# ToyRobot SOLID Remediation (3-Reviewer Consolidated)

## 1) Agent Findings Summary

### A) SRP/OCP Reviewer (CommandParser focus)
- **Top findings (ranked):**
  - `CommandParser` mixes classification, arg parsing, dispatch, and presentation triggers.
  - `PLACE` is parsed in more than one way, creating drift risk.
  - Extension requires central edits (`identifyCommand` + dispatch switch).
- **Keep:** immutable `handleCommand` style (`state -> TransitionResult`), existing command semantics/messages.
- **Change:** extract a single `parsePlaceArgs` and adopt a lightweight handler registry to reduce branching hotspots.
- **Conflict resolved:** keep incremental approach (registry, not full parser rewrite).

### B) DIP/Side-Effects Reviewer
- **Top findings (ranked):**
  - Side effects are scattered (`Report`, parser default, display helper) instead of boundary-owned.
  - Invalid-command path bypasses normal response/presentation flow.
- **Keep:** `index.ts` as composition root for I/O.
- **Change:** keep transitions pure and route user-visible output through one presenter boundary.
- **Conflict resolved:** preserve exact visible strings and call timing by parity tests before/after extraction.

### C) LSP/ISP/Type-Contracts Reviewer
- **Top findings (ranked):**
  - `RobotState.direction` uses `string`, weakening compile-time contracts.
  - Direction validity handled mostly at runtime.
- **Keep:** current `IMove`/`ITurn` narrow contracts and immutable return style.
- **Change:** narrow `RobotState.direction` (and related APIs) to `Directions` with boundary conversion in parser.
- **Conflict resolved:** type tightening deferred to PR3 to minimize churn/risk.

---

## 2) Consolidated SOLID Remediation Plan (PR1/PR2/PR3)

### PR1 — CommandParser SRP/OCP (low-medium risk)
- Extract one `parsePlaceArgs` helper and use it as parser’s single PLACE boundary.
- Introduce a pragmatic `Record<Commands, CommandHandler>` registry inside parser module.
- Keep `ParseCommand` external behavior and all response strings unchanged.

**Acceptance criteria**
- Existing tests stay green without message changes.
- Parser no longer duplicates PLACE parsing assumptions.
- Command additions become localized to registry + command enum recognition.

### PR2 — Output side-effect boundary isolation (medium risk)
- Remove direct output side effects from transition functions/parser default path.
- Make parser return data-only results; boundary presenter in `index.ts` owns printing.
- Keep exact user-visible output content and conditions unchanged.

**Acceptance criteria**
- CLI-visible behavior unchanged for REPORT/errors/invalid command.
- Tests assert parity of output behavior after boundary move.
- Coverage remains non-regressive.

### PR3 — Direction type contract hardening (low-medium risk)
- Change `RobotState.direction` to `Directions`.
- Update parser/place typing to provide validated `Directions` at boundary.
- Keep runtime invalid-direction semantics where currently expected.

**Acceptance criteria**
- Typecheck + tests green.
- No behavior/message regressions.
- Direction contract is compile-time constrained in state model.

---

## 3) Code Snippet Set (changed blocks only)

### Issue 1: `CommandParser` SRP/OCP
```ts
// src/Commands/CommandParser.ts
type CommandHandler = (command: string, state: RobotState) => TransitionResult;
type PlaceArgs = { x: number; y: number; direction: Directions };

function parsePlaceArgs(command: string): PlaceArgs | null {
  const m = command.match(/^PLACE\s(-?\d+),(-?\d+),(NORTH|SOUTH|EAST|WEST)$/);
  if (!m) return null;
  return { x: Number(m[1]), y: Number(m[2]), direction: m[3] as Directions };
}
```

```ts
// src/Commands/CommandParser.ts
const handlers: Record<Commands, CommandHandler> = {
  [Commands.PLACE]: (command, state) => {
    const parsed = parsePlaceArgs(command);
    return parsed ? place(state, parsed.x, parsed.y, parsed.direction) : { state, response: new Response(true, "") };
  },
  [Commands.MOVE]: (_command, state) => move(state),
  [Commands.LEFT]: (_command, state) => new TurnLeft().turn(state),
  [Commands.RIGHT]: (_command, state) => new TurnRight().turn(state),
  [Commands.REPORT]: (_command, state) => report(state),
};
```

### Issue 2: output side effects at boundary
```ts
// src/Commands/Report.ts
export function report(state: RobotState): ReportResult {
  if (state.placed) {
    const output = `Output: ${state.x},${state.y},${state.direction}`;
    return { state, response: new Response(true, output) };
  }
  return { state, response: new Response(false, "You need to place before you Report.") };
}
```

```ts
// src/Commands/CommandParser.ts
default:
  return { state, response: new Response(false, "Invalid Command") };
```

```ts
// src/index.ts (boundary presenter call)
const result = ParseCommand(trimmed, robot);
presentResponse(trimmed, result.response);
robot = Robot.fromState(result.state);
```

### Issue 3: `RobotState.direction` typing
```ts
// src/Models/Robot.ts
import { Directions } from "./Directions";

export type RobotState = Readonly<{
  x: number;
  y: number;
  direction: Directions;
  placed: boolean;
  size: number;
}>;
```

---

## 4) Validation Checklist

- **SOLID improvement by module**
  - `CommandParser`: SRP/OCP improved via parse helper + registry.
  - `Report`/`Display`/`index`: DIP/SRP improved via boundary-owned presentation.
  - `RobotState`: LSP/contract clarity improved with narrowed `direction` type.

- **Behavior/message parity unchanged**
  - Preserve current strings and scenarios (`Success`, table bounds errors, placement/report/turn messages, invalid command line).

- **TDD path**
  - **RED:** add/adjust focused tests for parse helper, boundary output parity, direction typing fixtures.
  - **GREEN:** implement smallest changed blocks above.
  - **REFACTOR:** remove temporary duplication, keep handlers/presenter small.

- **Coverage non-regression**
  - Run full test + coverage after each PR.
  - Ensure metrics stay at/above project baseline and recent achieved levels.