import assert from "node:assert";
import { exitCommand } from "./commands/exitCommand.js";
import { upCommand } from "./commands/upCommand.js";
import { cdCommand } from "./commands/cdCommand.js";
import { lsCommand } from "./commands/lsCommand.js";
import { catCommand } from "./commands/catCommand.js";
import { addCommand } from "./commands/addCommand.js";
import { rnCommand } from "./commands/rnCommand.js";
import { cpCommand } from "./commands/cpCommand.js";
import { mvCommand } from "./commands/mvCommand.js";
import { rmCommand } from "./commands/rmCommand.js";
import { osCommand } from "./commands/osCommand.js";

// Commands take an array of strings, which make the command and a string representing current directory.
// They return an object with "output: string | null", which is then printed to the terminal
// and "newDirectory: string | null", which is the directory we are in right now.
// or a nullish value, in which case nothing more is printed and directory isn't changed.
const commands = {
  up: upCommand,
  cd: cdCommand,
  ls: lsCommand,
  cat: catCommand,
  add: addCommand,
  rn: rnCommand,
  cp: cpCommand,
  mv: mvCommand,
  rm: rmCommand,
  os: osCommand,
  ".exit": exitCommand,
};

// Gets an array of strings that has length > 0, which represents the command
// and current directory, which is a string
// Returns an object with "output: string | null" and "newDirectory: string | null"
export async function resolveCommand(command, currentDirectory) {
  assert(command.length > 0);
  assert(typeof currentDirectory === "string");

  const [commandName, ...restOfCommand] = command;

  let newDirectory;
  try {
    const lowercaseCommandName = commandName.toLowerCase();
    assert(commands.hasOwnProperty(lowercaseCommandName), new Error("Invalid input"));

    const command = commands[lowercaseCommandName];
    newDirectory = await command(restOfCommand, currentDirectory);
  } catch (e) {
    // TODO: REMOVE E
    throw new Error(`Operation failed\n${e}`);
  }

  assert(typeof newDirectory === "string" || !newDirectory);

  if (!newDirectory) {
    return currentDirectory;
  }

  return newDirectory;
}
