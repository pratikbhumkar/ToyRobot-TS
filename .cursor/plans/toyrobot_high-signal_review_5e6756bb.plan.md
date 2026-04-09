---
name: ToyRobot High-Signal Review
overview: Prepare a production-focused code review document highlighting only critical and important issues with pragmatic fixes, centered on parser behavior, side-effect boundaries, and contract safety.
todos:
  - id: assemble-findings
    content: Compile critical and important findings with direct file references
    status: pending
  - id: map-fixes
    content: Attach smallest pragmatic fix to each finding
    status: pending
  - id: draft-review-file
    content: Write severity-ordered code-review.md with requested structure
    status: pending
  - id: sanity-check
    content: Verify recommendations preserve behavior/messages and remain incremental
    status: pending
isProject: false
---

# ToyRobot Code Review Plan (Concise + Snippet-Driven)

## Scope
- Produce `code-review.md` with only **critical/important** findings.
- Focus on parser correctness, side-effect boundaries, and contract safety.
- Include tiny code snippets + “how this can fail” demos per finding.

## Priority Findings To Document

### 1) Critical — PLACE parse fallback can silently succeed
- **Location:** [`/Users/pratikbhumkar/Projects/ToyRobot-TS/src/Commands/handlers/commandHandlers.ts`](/Users/pratikbhumkar/Projects/ToyRobot-TS/src/Commands/handlers/commandHandlers.ts)
- **Evidence snippet:**
```ts
if (!parsed) {
  return { state, response: new Response(true, "") };
}
```
- **Failure demo to include in review:**
```ts
// if identifyCommand allows format X but parsePlaceArgs rejects it:
const result = commandHandlers[Commands.PLACE]("PLACE <new format>", state);
// current behavior: Success=true, Message="" (silent no-op)
```
- **Smallest fix:** return invalid-command failure (or make this branch unreachable by using one parser source).

### 2) Important — Duplicate PLACE grammar causes drift risk
- **Locations:** [`/Users/pratikbhumkar/Projects/ToyRobot-TS/src/Commands/parsing/identifyCommand.ts`](/Users/pratikbhumkar/Projects/ToyRobot-TS/src/Commands/parsing/identifyCommand.ts), [`/Users/pratikbhumkar/Projects/ToyRobot-TS/src/Commands/parsing/parsePlaceArgs.ts`](/Users/pratikbhumkar/Projects/ToyRobot-TS/src/Commands/parsing/parsePlaceArgs.ts)
- **Evidence snippet:**
```ts
// identifyCommand
/^PLACE\s-?\d+,-?\d+,(NORTH$|SOUTH$|EAST$|WEST$)/
// parsePlaceArgs
/^PLACE\s(-?\d+),(-?\d+),(NORTH|SOUTH|EAST|WEST)$/
```
- **Failure demo to include in review:**
```ts
// future change applied to one regex only:
identifyCommand("PLACE 1,2,NORTH ") === Commands.PLACE
parsePlaceArgs("PLACE 1,2,NORTH ") === null
```
- **Smallest fix:** single authoritative parse function used for both classification and extraction.

### 3) Important — Output policy depends on raw command string
- **Location:** [`/Users/pratikbhumkar/Projects/ToyRobot-TS/src/DisplayMessage.ts`](/Users/pratikbhumkar/Projects/ToyRobot-TS/src/DisplayMessage.ts)
- **Evidence snippet:**
```ts
if (command === "REPORT" && response.Success) {
  console.log(response.Message);
}
```
- **Failure demo to include in review:**
```ts
presentResponse("report", { Success: true, Message: "Output: 1,2,NORTH" } as Response);
// no log despite valid report-like response payload
```
- **Smallest fix:** drive presenter off structured command identity or response metadata, not raw command text.

## Output Template For `code-review.md`
- Ordered by severity (Critical -> Important).
- For each finding:
  - file/reference
  - why critical/important
  - tiny evidence snippet
  - tiny failure demo
  - smallest pragmatic fix
- If no critical issues exist, explicitly state that first.

## Validation Gate
- Findings map to current code paths/tests.
- Suggested fixes preserve current messages/behavior by default.
- Recommendations stay incremental (no big-bang rewrite).