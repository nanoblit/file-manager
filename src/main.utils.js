export function printCurrentDirectory(currentDirectory) {
  console.log(`You are currently in ${currentDirectory}`);
}

export function showExitMessage(username) {
  if (username) {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);

    return;
  }

  console.log("Thank you for using File Manager, goodbye!");
}
