import { ParseCommand } from './Commands/CommandParser';
import { Robot } from "./Models/Robot";

//Change size as per requirements
let robot = new Robot(5);
const readline = require('readline')
	.createInterface({
		input: process.stdin,
		output: process.stdout
	});

function handleInput(line: string): void {
	ParseCommand(line, robot);
}

readline
	.on('line', handleInput)
	.on('close', () => {
		console.log('Thank you for your time!');
		process.exit(0);
	})
	.setPrompt('Welcome to Pratik\'s Toy Robot \
\nThe valid commands are PLACE, REPORT, MOVE \
\nYou cannot move before \
you place and you can only move 1 position.\n')
readline.prompt();