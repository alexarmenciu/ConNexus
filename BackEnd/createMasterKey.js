
const fs = require("fs");
const CryptoJS = require("crypto-js");

const keyFilePath = '.encryption.key';

if (fs.existsSync(keyFilePath)) {
  // make sure the user wants to overwrite the key
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  readline.question('Key file already exists. Overwrite? (y/n) ', (answer) => {
    if (answer === 'y') {
      createKey();
    }
    readline.close();
  });
} else {
  createKey();
}

function createKey() {
  // Generate a 256-bit key
  encryptionKey = CryptoJS.lib.WordArray.random(32);

  // Convert the key to a Base64-encoded string
  encryptionKey = encryptionKey.toString(CryptoJS.enc.Base64);

  // Save the key to a file
  fs.writeFileSync(keyFilePath, encryptionKey);
  console.log("Key file created successfully");
}