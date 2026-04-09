import { Directions } from "../../Models/Directions";

export type PlaceArgs = { x: number; y: number; direction: Directions };

export function parsePlaceArgs(command: string): PlaceArgs | null {
    const match = command.match(/^PLACE\s(-?\d+),(-?\d+),(NORTH|SOUTH|EAST|WEST)$/);
    if (!match) {
        return null;
    }
    return { x: Number(match[1]), y: Number(match[2]), direction: match[3] as Directions };
}
