import path from "node:path";
import fs from "node:fs/promises";

export async function cpCommand(command, currentDirectory) {
  const oldPath = path.resolve(currentDirectory, command[0]);
  const newPath = path.resolve(currentDirectory, command[1]);

  let oldFile, newFile;

  try {
    oldFile = await fs.open(oldPath, "r");
    newFile = await fs.open(newPath, "wx");
  } catch (e) {
    oldFile?.close();
    newFile?.close();

    throw new Error(e);
  }

  const readStream = oldFile.createReadStream();
  const writeStream = newFile.createWriteStream();

  await readStream.pipe(writeStream);
}
