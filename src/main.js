import { resolveCommand } from "./command.js";
import { getInitialContext } from "./context.js";
import { getInput } from "./getInput.js";

async function main() {
  const context = getInitialContext();

  console.log(context);

  while (true) {
    const input = await getInput("this is a question");
    console.log(input);

    if (!input.length) {
      continue;
    }

    resolveCommand(input);
  }
}

await main();
