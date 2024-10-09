function main() {
  console.log(process.argv);
  const username = getUsername();
  console.log(username);
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

main();
