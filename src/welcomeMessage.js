export function showWelcomeMessage() {
  const username = getUsername();

  if (username) {
    console.log(`Welcome to the File Manager, ${username}!`);

    return username;
  }

  console.log("Welcome to the File Manager!");

  return null;
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
