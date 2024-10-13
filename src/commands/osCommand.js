import os from "node:os";

const commands = {
  "--eol": eolCommand,
  "--cpus": cpusCommand,
  "--homedir": homedirCommand,
  "--username": usernameCommand,
  "--architecture": architectureCommand,
};

export function osCommand(command) {
  const commandName = command[0].toLowerCase();
  const output = commands[commandName]();
  process.stdout.write(`\n${output}\n`);
}

function eolCommand() {
  return JSON.stringify(os.EOL);
}

function cpusCommand() {
  const cpusLength = os.cpus().length;
  const clockSpeedFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });
  const cpusInfo = os
    .cpus()
    .map(({ model, speed }) => `${model} - ${clockSpeedFormat.format(speed / 1024)} GHz`)
    .join("\n");

  return `${cpusLength} CPUs\n${cpusInfo}`;
}

function homedirCommand() {
  return os.homedir();
}

function usernameCommand() {
  return os.userInfo().username;
}

function architectureCommand() {
  return os.arch();
}
