import assert from "node:assert";
import { exitCommand } from "./commands/exitCommand.js";
import { upCommand } from "./commands/upCommand.js";
import { cdCommand } from "./commands/cdCommand.js";
import { lsCommand } from "./commands/lsCommand.js";

// Commands take an array of strings, which make the command and a string representing current directory.
// They return an object with "output: string | null", which is then printed to the terminal
// and "newDirectory: string | null", which is the directory we are in right now.
// or a nullish value, in which case nothing more is printed and directory isn't changed.
const commands = {
  up: upCommand,
  cd: cdCommand,
  ls: lsCommand,
  ".exit": exitCommand,
};

// Gets an array of strings that has length > 0, which represents the command
// and current directory, which is a string
// Returns an object with "output: string | null" and "newDirectory: string | null"
export async function resolveCommand(command, currentDirectory) {
  assert(command.length > 0);
  assert(typeof currentDirectory === "string");

  const [commandName, ...rest] = command;

  assert(commands.hasOwnProperty(commandName), new Error("Invalid input"));

  let returnValue;

  try {
    returnValue = await commands[commandName](rest, currentDirectory);
  } catch (e) {
    // TODO: REMOVE E
    throw new Error(`Operation failed\n${e}`);
  }

  if (!returnValue) {
    return { output: null, newDirectory: null };
  }

  const output = returnValue.hasOwnProperty("output") ? returnValue.output : null;
  const newDirectory = returnValue.hasOwnProperty("newDirectory") ? returnValue.newDirectory : null;

  assert(typeof output === "string" || output === null);
  assert(typeof newDirectory === "string" || newDirectory === null);

  return { output, newDirectory };
}
