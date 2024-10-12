import fs from "node:fs/promises";
import path from "node:path";

// TODO: Make the output pretty
export async function lsCommand(_command, currentDirectory) {
  const itemPromises = (await fs.readdir(currentDirectory))
    .map(async (name) => {
      const itemPath = path.join(currentDirectory, name);
      const itemStats = await fs.stat(itemPath);

      if (itemStats.isDirectory()) {
        return { name, type: "directory" };
      }

      if (itemStats.isFile()) {
        return { name, type: "file" };
      }

      return null;
    })
    .filter((value) => value);

  const items = await Promise.all(itemPromises);
  const sortedFolders = items.filter(({ type }) => type === "directory").sort((a, b) => a.name.localeCompare(b.name));
  const sortedFiles = items.filter(({ type }) => type === "file").sort((a, b) => a.name.localeCompare(b.name));
  const sortedItems = [...sortedFolders, ...sortedFiles];
  const output = sortedItems.map(({ name, type }) => `${name} --- ${type}`).join("\n");

  return { output };
}
