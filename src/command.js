import assert from "node:assert";

const commands = {
  cp: () => console.log("cp"),
  mv: () => console.log("mv"),
};

export function resolveCommand(command, context) {
  assert(command.length > 0);

  const [commandName, ...rest] = command;

  assert(command.hasOwnProperty(commandName));

  return commands[commandName](rest, context);
}
