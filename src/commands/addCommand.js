import fs from "node:fs/promises";
import path from "node:path";

export async function addCommand(command, currentDirectory) {
  const fileName = command[0];
  const filePath = path.resolve(currentDirectory, fileName);

  await fs.open(filePath, "wx");
}
