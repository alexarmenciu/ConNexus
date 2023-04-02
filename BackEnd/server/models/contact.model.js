const mongoose = require('mongoose');
const fs = require("fs");
const CryptoJS = require("crypto-js");

const keyFilePath = 'encryption.key';
let encryptionKey;

if (fs.existsSync(keyFilePath)) {
  // Read the key from the file
  encryptionKey = fs.readFileSync(keyFilePath, "utf-8");

  // // Convert the key string to a WordArray object
  // encryptionKey = CryptoJS.enc.Base64.parse(keyString);
} else {
  // Generate a 256-bit key
  encryptionKey = CryptoJS.lib.WordArray.random(32);

  
  // Convert the key to a Base64-encoded string
  encryptionKey = encryptionKey.toString(CryptoJS.enc.Base64);
  
  // Save the key to a file
  fs.writeFileSync(keyFilePath, encryptionKey);
}

console.log('Key:', encryptionKey.toString(CryptoJS.enc.Base64));

const ContactSchema = new mongoose.Schema({
  name: String,
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  additionalFields: {
    type: String, // Change type to String
    default: '{}', // Default value as empty JSON object
  },
});

// Encrypt the additionalFields property before saving to the database
ContactSchema.pre('save', async function (next) {
  const contact = this;
  if (contact.isModified('additionalFields')) {
    const dataToEncrypt = JSON.stringify(contact.additionalFields); // Convert to strin
    let encrypted = CryptoJS.AES.encrypt(dataToEncrypt, encryptionKey).toString();
    contact.additionalFields = encrypted;
  }
  next();
});

// Decrypt the additionalFields property after retrieving from the database
ContactSchema.post('findOne', async function (doc) {
  if (doc) {
    const decrypted = CryptoJS.AES.decrypt(doc.additionalFields, encryptionKey).toString(CryptoJS.enc.Utf8);
    doc.additionalFields = JSON.parse(decrypted); // Convert back to object
  }
});

ContactSchema.post('find', async function (docs) {
  console.log("pre ", docs)
  if (docs) {
    for (const doc of docs) {
      const decrypted = CryptoJS.AES.decrypt(doc.additionalFields, encryptionKey).toString(CryptoJS.enc.Utf8);
      doc.additionalFields = JSON.parse(decrypted); // Convert back to object
    }
  }
  console.log("post ", docs)
});

// Create the Contact model
const Contact = mongoose.model('Contact', ContactSchema);

// Export the Contact model
module.exports = Contact;
