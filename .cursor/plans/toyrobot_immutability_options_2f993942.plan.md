---
name: ToyRobot Immutability Options
overview: Option 2 rollout using strict pure transitions, TDD, and behavior/coverage parity guarantees.
todos:
  - id: behavior-test-parity-first
    content: TODO #1 Preserve all existing test scenarios and behavior parity before and during immutability changes
    status: pending
  - id: tdd-red-green-refactor
    content: Apply TDD per change set (red -> green -> refactor)
    status: pending
  - id: robotstate-wrapper
    content: Introduce immutable RobotState model and thin Robot wrapper helpers
    status: pending
  - id: move-pure-transitions
    content: Refactor MOVE and directional handlers to pure state-in/state-out
    status: pending
  - id: parser-expression-flow
    content: Rewrite parser to expression-oriented transition flow with no local reassignment
    status: pending
  - id: immutability-tests
    content: Add minimal tests proving no mutation of input state
    status: pending
  - id: coverage-gates
    content: Validate coverage at/above baseline thresholds before completion
    status: pending
isProject: false
---

# ToyRobot Option 2 Plan (TDD-First, Concise)

## RED (tests first)
- Preserve all existing scenarios in `src/tests/Integration.test.ts`; only update call signatures if needed (`ParseCommand` returning `Robot`).
- Add minimal immutability tests for MOVE:
  - `move(state)` returns new state for valid EAST move.
  - input `state` object remains unchanged after `move(state)`.
  - boundary and unplaced responses remain exact.
- Add parser flow test verifying returned robot reflects updated state without mutating prior state reference.

## GREEN (minimal code to pass)
- `src/Models/Robot.ts`
  - Add immutable `RobotState` type.
  - Convert `Robot` to thin wrapper with `toState()` / `fromState()` (and `create()` factory).
  - Remove setters from active transition flow.
- `src/Commands/Move/Move.ts`
  - Introduce pure `move(state): { state, response }`.
  - Keep temporary compatibility `Move(robot)` adapter for incremental rollout.
- `src/Commands/Move/MoveEast.ts`, `MoveWest.ts`, `MoveNorth.ts`, `MoveSouth.ts`
  - Switch to `state -> { state, response }` using object spread only.
- `src/Commands/CommandParser.ts`
  - Expression-oriented orchestration:
    - `const result = handleCommand(command, robot.toState())`
    - `displayErrorMessage(result.response)`
    - `return Robot.fromState(result.state)`
  - No `let current`, no reassignment.

## REFACTOR (small, no behavior change)
- Reduce duplication in directional moves with shared helper if trivial.
- Keep parser branch returns direct and deterministic.
- Remove dead mutating paths once pure transitions are wired and passing.

## Behavior/message parity constraints
- Keep all existing scenarios and response text unchanged:
  - `"Success"`
  - `"Cannot move outside the table"`
  - `"You need to place before you Move."`
  - `"Invalid direction"`

## Coverage gate (must stay >= baseline)
- Stmts: **86.2%**
- Branch: **79.66%**
- Funcs: **80.55%**
- Lines: **85.45%**

## Risk / rollback (brief)
- Risk: mixed-mode migration (pure MOVE + legacy non-MOVE) can cause contract drift.
- Rollback: keep `Move(robot)` compatibility adapter; if regression occurs, route parser MOVE through adapter while keeping pure `move(state)` tests as safety net.

## Final checklist
- Existing test scenarios pass unchanged (except required signature plumbing).
- MOVE flow is pure state-in/state-out with no mutation in active path.
- Parser has no local state reassignment.
- Response messages are exactly unchanged.
- Coverage is at/above all baseline thresholds.

---

## Restored Detailed Content and Snippets

### A) Revised Architecture for Option 2 Only

#### Final flow contract
- Target contract in orchestration and transitions: `command + state -> { state, response }`.
- Parser entry: `ParseCommand(command, robot)` calls pure `handleCommand(command, robot.toState())`.
- Parser exit: logs response once, returns `Robot.fromState(result.state)`.
- No parser `let` locals and no reassignment in parser; each branch returns directly.

#### Compatibility wrappers (incremental and pragmatic)
- Keep `Robot` as a read-only wrapper for external call-site compatibility (`getX/getY/...`).
- Keep `Move(robot)` wrapper only as a temporary adapter; internally it calls pure `move(state)`.
- Active parser flow should call pure state transitions directly; wrappers remain only for untouched external usage and staged rollout.

### B) Implementation-Ready TypeScript Diffs

#### 1) `src/Models/Robot.ts`
```diff
 import { Directions } from "./Directions";
 
+export type RobotState = Readonly<{
+  x: number;
+  y: number;
+  direction: string;
+  placed: boolean;
+  size: number;
+}>;
+
 export class Robot {
-    x: number;
-    y: number;
-    direction: string;
-    placed: boolean;
-    size: number;
+    private constructor(private readonly state: RobotState) {}
 
-    constructor(size: number) {
-        this.x = 0;
-        this.y = 0;
-        this.placed = false;
-        this.size = size;
-        this.direction = Directions.NORTH;
-    }
+    static create(size: number): Robot {
+        return new Robot({
+            x: 0,
+            y: 0,
+            placed: false,
+            size,
+            direction: Directions.NORTH
+        });
+    }
+
+    static fromState(state: RobotState): Robot {
+        return new Robot({ ...state });
+    }
+
+    toState(): RobotState {
+        return { ...this.state };
+    }
 
     getX(): number {
-        return this.x;
+        return this.state.x;
     }
-    setX(x: number): void {
-        this.x = x;
-    }
     getY(): number {
-        return this.y;
+        return this.state.y;
     }
-    setY(y: number): void {
-        this.y = y;
-    }
     getDirection(): string {
-        return this.direction;
+        return this.state.direction;
     }
-    setDirection(direction: string): void {
-        this.direction = direction;
-    }
     getPlaced(): boolean {
-        return this.placed;
+        return this.state.placed;
     }
-    setPlaced(placed: boolean): void {
-        this.placed = placed;
-    }
     getSize(): number {
-        return this.size;
+        return this.state.size;
     }
-    setSize(size: number): void {
-        this.size = size;
-    }
 }
```

#### 2) `src/Commands/Move/Move.ts`
```diff
 import { Directions } from "../../Models/Directions";
-import { Robot } from "../../Models/Robot";
+import { Robot, RobotState } from "../../Models/Robot";
 import {MoveEast, MoveNorth, MoveSouth, MoveWest} from "./index"
 import { Response } from "../../Models/Response";
 
+export type TransitionResult = { state: RobotState; response: Response };
+
 export interface IMove {
-  move(robot: Robot):Response
+  move(state: RobotState): TransitionResult
 }
 
-export function Move (robot: Robot): Response {
-  if (robot.getPlaced()) {
-    switch (robot.getDirection()) {
+export function move(state: RobotState): TransitionResult {
+  if (!state.placed) {
+    return { state, response: new Response(false, "You need to place before you Move.") };
+  }
+
+  switch (state.direction) {
       case Directions.NORTH:
         const moveNorth:IMove = new MoveNorth();
-        return moveNorth.move(robot);
+        return moveNorth.move(state);
       case Directions.SOUTH:
         const moveSouth:IMove = new MoveSouth();
-        return moveSouth.move(robot);
+        return moveSouth.move(state);
       case Directions.EAST:
         const moveEast:IMove = new MoveEast();
-        return moveEast.move(robot);
+        return moveEast.move(state);
       case Directions.WEST:
         const moveWest:IMove = new MoveWest();
-        return moveWest.move(robot);
+        return moveWest.move(state);
       default:
-        return new Response(false, "Invalid direction")
+        return { state, response: new Response(false, "Invalid direction") };
     }
-  } else {
-    return new Response(false, "You need to place before you Move.")
-  }
-};
+}
+
+// compatibility wrapper for existing external call sites
+export function Move(robot: Robot): { robot: Robot; response: Response } {
+  const result = move(robot.toState());
+  return { robot: Robot.fromState(result.state), response: result.response };
+}
```

#### 3) `src/Commands/CommandParser.ts` (expression-oriented; no reassignment)
```diff
-import { Place, Report, ITurn, TurnLeft, TurnRight, Move } from "./index";
+import { Report } from "./index";
 import { Commands } from "../Models/Commands";
-import { Robot } from "../Models/Robot";
+import { Robot, RobotState } from "../Models/Robot";
 import { Response } from "../Models/Response";
 import { displayErrorMessage } from "../DisplayMessage";
+import { move, TransitionResult } from "./Move/Move";
 
-export function ParseCommand(command:string, robot:Robot): void {
-    const identifiedCommand: string|boolean = identifyCommand(command);
-    switch (identifiedCommand) {
-        case Commands.PLACE:
-            const placeCoordinates = command.match(/(\d[\d\.]*)/g)
-            const placeDirection = command.match(/(NORTH$|SOUTH$|EAST$|WEST$)/g)
-            if (placeCoordinates && placeCoordinates.length === 2 && placeDirection && placeDirection.length === 1) {
-                const outcome:Response = Place(Number(placeCoordinates[0]), Number(placeCoordinates[1]), placeDirection[0], robot)
-                displayErrorMessage(outcome)
-            }
-            break;
-        case Commands.MOVE:
-            const moveResponse:Response = Move(robot)
-            displayErrorMessage(moveResponse)
-            break;
-        case Commands.LEFT:
-            const turnLeft: ITurn = new TurnLeft();
-            const turnLeftResponse:Response = turnLeft.turn(robot)
-            displayErrorMessage(turnLeftResponse)
-            break;
-        case Commands.RIGHT:
-            const turnRight: ITurn = new TurnRight();
-            const turnRightResponse:Response = turnRight.turn(robot);
-            displayErrorMessage(turnRightResponse)
-            break;
-        case Commands.REPORT:
-            const reportResponse:Response = Report(robot)
-            displayErrorMessage(reportResponse)
-            break;
-        default:
-            console.log('Invalid Command')
-            break;
-    }
+export function ParseCommand(command: string, robot: Robot): Robot {
+    const result = handleCommand(command, robot.toState());
+    displayErrorMessage(result.response);
+    return Robot.fromState(result.state);
+}
+
+function handleCommand(command: string, state: RobotState): TransitionResult {
+    switch (identifyCommand(command)) {
+        case Commands.MOVE:
+            return move(state);
+        case Commands.PLACE:
+            return placeTransition(command, state);
+        case Commands.LEFT:
+            return leftTransition(state);
+        case Commands.RIGHT:
+            return rightTransition(state);
+        case Commands.REPORT:
+            return reportTransition(state);
+        default:
+            console.log("Invalid Command");
+            return { state, response: new Response(false, "Invalid Command") };
+    }
 }
```

#### 4) Minimal touched MOVE direction files

`src/Commands/Move/MoveEast.ts`
```diff
 import { Response } from "../../Models/Response";
-import { Robot } from "../../Models/Robot";
+import { RobotState } from "../../Models/Robot";
 import { IMove } from "./Move";
 
 export class MoveEast implements IMove {
-    move(robot: Robot):Response{
-        if (robot.getX() < robot.getSize() - 1) {
-            robot.setX(robot.getX() + 1)
-            return new Response(true, "Success");
-        } else {
-            return new Response(false, "Cannot move outside the table");
-        }
-    }
+    move(state: RobotState) {
+        return state.x < state.size - 1
+            ? { state: { ...state, x: state.x + 1 }, response: new Response(true, "Success") }
+            : { state, response: new Response(false, "Cannot move outside the table") };
+    }
 }
```

`src/Commands/Move/MoveWest.ts`
```diff
 import { Response } from "../../Models/Response";
-import { Robot } from "../../Models/Robot";
+import { RobotState } from "../../Models/Robot";
 import { IMove } from "./Move";
 
 export class MoveWest implements IMove {
-    move(robot: Robot): Response {
-        let x: number = robot.getX();
-        if (x > 0) {
-            robot.setX(x - 1)
-            return new Response(true, "Success");
-        } else {
-            return new Response(false, "Cannot move outside the table");
-        }
-    }
+    move(state: RobotState) {
+        return state.x > 0
+            ? { state: { ...state, x: state.x - 1 }, response: new Response(true, "Success") }
+            : { state, response: new Response(false, "Cannot move outside the table") };
+    }
 }
```

`src/Commands/Move/MoveNorth.ts` and `src/Commands/Move/MoveSouth.ts`
- Apply the same state-in/state-out pattern as East/West with unchanged response strings.

### C) Parser rewrite requirement
- Required style:
  - `return Robot.fromState(handleCommand(command, robot.toState()).state)`
  - `switch` returns directly from each branch.
- Prohibited:
  - `let current = ...`
  - `current = ...`
  - any object field mutation in active command flow.

### D) Proof of immutability checklist
- `setX` / `setY` replaced by `{ ...state, x: ... }` / `{ ...state, y: ... }`.
- `setDirection` / `setPlaced` replaced by pure transition returns.
- MOVE directional handlers no longer mutate Robot instances.
- Parser no longer reassigns local state variables.
- Remaining reassignment in active parser + MOVE flow: **none**.
- Side effects retained intentionally for parity: `displayErrorMessage`, `console.log("Invalid Command")`.

### E) Risk + rollout
- Risk: mixed-mode migration (MOVE pure, others transitional) can introduce contract drift.
- Rollout:
  1) land RobotState wrapper,
  2) land pure MOVE + parser expression flow,
  3) migrate PLACE/LEFT/RIGHT/REPORT transitions.
- Rollback:
  - keep `Move(robot)` adapter for compatibility;
  - if regression appears, route parser MOVE through adapter while retaining pure `move(state)` tests.
