import { ParseCommand } from './Commands/CommandParser';
import { Robot } from "./Models/Robot";
import * as readline from 'readline'

//Change size as per requirements
const robot = new Robot(5);
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log(`Welcome to Pratik's Toy Robot
The valid commands are PLACE, REPORT, MOVE, LEFT, RIGHT
You cannot move before you place and you can only move 1 position.`);

function handleInput(line: string): void {
	const trimmed = line.trim();
	if (!trimmed) {
		rl.prompt();
		return;
	}
	ParseCommand(trimmed, robot);
	rl.prompt();
}

readline
	rl.on('line', handleInput)
	rl.on('close', () => {
		console.log('Thank you for your time!');
		process.exit(0);
	})
	rl.setPrompt('> ');
rl.prompt();
