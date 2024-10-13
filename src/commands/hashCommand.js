import path from "node:path";
import fs from "node:fs/promises";
import { createHash } from "node:crypto";

export async function hashCommand(command, currentDirectory) {
  const pathToHash = path.resolve(currentDirectory, command[0]);
  const readStream = (await fs.open(pathToHash)).createReadStream();
  const hash = createHash("sha256");
  await readStream.pipe(hash);
  const hashText = hash.digest("hex");

  process.stdout.write(`\n${hashText}\n`);
}
