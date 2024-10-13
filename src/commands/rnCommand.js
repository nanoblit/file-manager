import fs from "node:fs/promises";
import path from "node:path";

export async function rnCommand(command, currentDirectory) {
  const oldPath = path.resolve(currentDirectory, command[0]);
  const newPath = path.resolve(currentDirectory, command[1]);

  await fs.rename(oldPath, newPath);
}
