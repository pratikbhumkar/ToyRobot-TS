import { ParseCommand } from './Commands/CommandParser';
import { Robot } from "./Models/Robot";

//Change size as per requirements
const robot = new Robot(5);
const readline = require('readline')
	.createInterface({
		input: process.stdin,
		output: process.stdout
	});

console.log(`Welcome to Pratik's Toy Robot
The valid commands are PLACE, REPORT, MOVE, LEFT, RIGHT
You cannot move before you place and you can only move 1 position.`);

function handleInput(line: string): void {
	const trimmed = line.trim();
	if (!trimmed) {
		readline.prompt();
		return;
	}
	ParseCommand(trimmed, robot);
	readline.prompt();
}

readline
	.on('line', handleInput)
	.on('close', () => {
		console.log('Thank you for your time!');
		process.exit(0);
	})
	.setPrompt('> ');
readline.prompt();
