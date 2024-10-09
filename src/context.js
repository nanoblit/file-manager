import os from "node:os";
import path from "node:path";

export function getInitialContext() {
  return { username: getUsername(), currentDirectory: getHomeDirectory() };
}

function getUsername() {
  if (process.argv.length < 3) {
    return null;
  }

  const usernameValue = process.argv[2].split("=");

  if (usernameValue.length !== 2) {
    return null;
  }

  const [varName, username] = usernameValue;

  if (varName.toLowerCase() !== "--username") {
    return null;
  }

  if (!username.trim()) {
    return null;
  }

  return username;
}

function getHomeDirectory() {
  return path.join(os.homedir());
}
