import { access } from "node:fs/promises";
import path from "path";

export async function upCommand(_command, currentDirectory) {
  const newDirectory = path.resolve(currentDirectory, "..");

  await access(newDirectory);

  return { newDirectory };
}
