import { createBrotliCompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";

export async function compressCommand(command, currentDirectory) {
  const sourcePath = path.resolve(currentDirectory, command[0]);
  const newFilePath = path.resolve(currentDirectory, command[1]);

  const gzip = createBrotliCompress();

  await pipeline(createReadStream(sourcePath), gzip, createWriteStream(newFilePath));
}
