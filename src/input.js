import readline from "node:readline";

// Takes the prompt which is a string.
// Returns a Promise<string[]> with the parts of the command.
export async function getInput(prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    function handleSigint() {
      rl.close();
      resolve([]);
      process.exit();
    }

    rl.on("SIGINT", handleSigint);

    rl.question(`${prompt}\n`, (response) => {
      rl.close();
      resolve(response.split(" ").filter((text) => text));
    });

    rl.on("close", () => rl.off("SIGINT", handleSigint));
  });
}
