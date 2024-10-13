import fs from "node:fs/promises";
import path from "node:path";

export async function rmCommand(command, currentDirectory) {
  const removePath = path.resolve(currentDirectory, command[0]);

  await fs.rm(removePath, { recursive: true });
}
