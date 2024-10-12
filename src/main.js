import path from "node:path";
import os from "node:os";
import assert from "node:assert";
import { resolveCommand } from "./command.js";
import { getInput } from "./input.js";
import { showWelcomeMessage } from "./welcomeMessage.js";
import { printCurrentDirectory, showExitMessage } from "./main.utils.js";

async function main() {
  let currentDirectory = path.join(os.homedir());
  const username = showWelcomeMessage();

  process.on("exit", () => showExitMessage(username));

  printCurrentDirectory(currentDirectory);

  // Handle user's input
  while (true) {
    const input = await getInput("Please, enter a command");

    assert(input.every((element) => typeof element === "string"));

    if (!input.length) {
      continue;
    }

    try {
      const { output, newDirectory } = await resolveCommand(input, currentDirectory);

      assert(typeof output === "string" || output === null);
      assert(typeof newDirectory === "string" || newDirectory === null);

      if (newDirectory) {
        currentDirectory = newDirectory;
      }

      if (output) {
        console.log(output);
      }

      printCurrentDirectory(currentDirectory);
    } catch (e) {
      // TODO: Only log the message
      console.log(e);
    }
  }
}

await main();
