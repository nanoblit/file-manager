import { access } from "node:fs/promises";
import path from "node:path";

export async function cdCommand(command, currentDirectory) {
  const dirChange = command[0];

  const newDirectory = path.resolve(currentDirectory, dirChange);

  await access(newDirectory);

  return newDirectory;
}
