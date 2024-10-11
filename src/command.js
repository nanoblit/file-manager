import assert from "node:assert";
import { exitCommand } from "./commands/exitCommand.js";

// Commands take an array of strings, which make the command and a string representing current directory.
// They return an object with output string, which is then printed to the terminal
// and newDirectory, which is the directory we are in right now.
const commands = {
  cp: () => console.log("cp"),
  mv: () => console.log("mv"),
  ".exit": exitCommand,
};

/**
 * @param {string[]} command
 * @param {string} currentDirectory
 * @returns {{output: string, newDirectory: string}}
 */
export async function resolveCommand(command, currentDirectory) {
  assert(command.length > 0);
  assert(typeof currentDirectory === "string");

  const [commandName, ...rest] = command;

  assert(commands.hasOwnProperty(commandName));

  returnValue = await commands[commandName](rest, currentDirectory);

  const output = returnValue.hasOwnProperty("output") ? returnValue.output : null;
  const newDirectory = returnValue.hasOwnProperty("newDirectory") ? returnValue.newDirectory : null;

  assert(typeof output === "string" || output === null);
  assert(typeof newDirectory === "string" || newDirectory === null);

  return { output, newDirectory };
}
