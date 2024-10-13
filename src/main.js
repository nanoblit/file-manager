import path from "node:path";
import os from "node:os";
import assert from "node:assert";
import { resolveCommand } from "./command.js";
import { getInput } from "./input.js";
import { showWelcomeMessage } from "./welcomeMessage.js";
import { printCurrentDirectory, showExitMessage } from "./main.utils.js";

async function main() {
  const username = showWelcomeMessage();
  process.on("exit", () => showExitMessage(username));

  let currentDirectory = path.join(os.homedir());
  printCurrentDirectory(currentDirectory);

  // Handle user's input
  while (true) {
    process.stdout.write("\n");
    const input = await getInput("Please, enter a command");

    assert(input.every((element) => typeof element === "string"));

    if (!input.length) {
      continue;
    }

    try {
      currentDirectory = await resolveCommand(input, currentDirectory);

      assert(typeof currentDirectory === "string");

      process.stdout.write("\n");
      printCurrentDirectory(currentDirectory);
    } catch (e) {
      // TODO: Only log the message inside resolveCommand
      process.stdout.write("\n");
      console.log(e);
    }
  }
}

await main();
