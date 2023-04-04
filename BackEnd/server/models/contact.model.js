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
    type: Map,
    of: String,
    default: {}
  },
});

// Encrypt the additionalFields property before saving to the database
ContactSchema.pre('save', async function (next) {
  const contact = this;
  if (contact.isModified('additionalFields')) {
    // encrypt the key value pairs
    encryptedFields = {};
    this.additionalFields.forEach((value, key) => {
      encryptedKey = CryptoJS.AES.encrypt(key, encryptionKey).toString();
      encryptedValue = CryptoJS.AES.encrypt(value, encryptionKey).toString();
      encryptedFields[encryptedKey] = encryptedValue;
    });


    contact.additionalFields = encryptedFields;
  }
  next();
});

// Decrypt the additionalFields property after retrieving from the database
ContactSchema.post('findOne', async function (doc) {
  if (doc) {
    doc.additionalFields = doc.decryptAdditionalFields();
  }
});

ContactSchema.post('find', async function (docs) {
  console.log("pre ", docs)
  if (docs) {
    for (const doc of docs) {
      doc.additionalFields = doc.decryptAdditionalFields();
    }
  }
  console.log("post ", docs)
});

// helper to decrypt the additionalFields property
ContactSchema.methods.decryptAdditionalFields = function () {
  decryptedFields = {};
  this.additionalFields.forEach((value, key) => {
    decryptedKey = CryptoJS.AES.decrypt(key, encryptionKey).toString(CryptoJS.enc.Utf8);
    decryptedValue = CryptoJS.AES.decrypt(value, encryptionKey).toString(CryptoJS.enc.Utf8);
    decryptedFields[decryptedKey] = decryptedValue;
  });
  return decryptedFields;
}

// Create the Contact model
const Contact = mongoose.model('Contact', ContactSchema);

// Export the Contact model
module.exports = Contact;
