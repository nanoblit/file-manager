import { createReadStream } from "node:fs";
import path from "node:path";

export async function catCommand(command, currentDirectory) {
  await new Promise((resolve, reject) => {
    const relativeFilePath = command[0];
    const filePath = path.resolve(currentDirectory, relativeFilePath);
    const readStream = createReadStream(filePath);

    process.stdout.write("\n");

    readStream.on("data", (data) => {
      process.stdout.write(data);
    });

    readStream.on("close", () => {
      process.stdout.write("\n");
      resolve();
    });

    readStream.on("error", (err) => {
      reject(err);
    });
  });
}
