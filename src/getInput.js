import readline from "node:readline";

export async function getInput(prompt) {
  return new Promise((resolve, _reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`${prompt}\n`, (response) => {
      rl.close();
      resolve(response.split(" ").filter((text) => text));
    });
  });
}
