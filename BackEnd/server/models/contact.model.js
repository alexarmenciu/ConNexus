const mongoose = require('mongoose');
const fs = require("fs");
const CryptoJS = require("crypto-js");

const keyFilePath = '.encryption.key';
let encryptionKey;

if (fs.existsSync(keyFilePath)) {
  // Read the key from the file
  encryptionKey = fs.readFileSync(keyFilePath, "utf-8");
} else {
  throw new Error("Encryption key file not found");
}

/**
 * Contact Schema
 * 
 * @typedef {Object} Contact
 * @property {string} name - The name of the contact
 * @property {string} uid - The id of the user that owns the contact
 * @property {Map<string, string>} additionalFields - A map of custom additional fields
 */
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

/**
 * Encrypts the contact's fields before saving to the database
 * 
 * @param {Function} next - The next function to call
 * @returns {void}
 */
ContactSchema.pre('save', async function (next) {
  const contact = this;
  encryptContact(contact);
  next();
});

/**
 * Encrypts the contact's fields before updating in the database
 */
ContactSchema.pre('updateOne', async function (next) {
  
  const contact = this._update.$set;
  encryptContact(contact);
  next();
});

/**
 * Decrypts the additionalFields and name properties after retrieving from the database.
 */
ContactSchema.post('findOne', async function (doc) {
  if (doc) {
    doc.additionalFields = doc.decryptAdditionalFields();
    doc.name = CryptoJS.AES.decrypt(doc.name, encryptionKey).toString(CryptoJS.enc.Utf8);
  }
});

/**
 * Decrypts the additionalFields and name properties after retrieving from the database.
*/
ContactSchema.post('find', async function (docs) {
  if (docs) {
    for (const doc of docs) {
      doc.additionalFields = doc.decryptAdditionalFields();
      doc.name = CryptoJS.AES.decrypt(doc.name, encryptionKey).toString(CryptoJS.enc.Utf8);
    }
  }
});

/**
 * Encrypts the additionalFields and name properties before saving to the database.
 * The fields are encrypted using AES encryption with the master encryption key.
 * To encrypt the additionalFields, we encrypt each key value pair.
 * 
 * @param {Contact} contact - The contact to encrypt
 * @returns {void}
 */
const encryptContact = function (contact) {
    const encryptedName = CryptoJS.AES.encrypt(contact.name, encryptionKey).toString();
    contact.name = encryptedName;
    encryptedFields = {};
    contact.additionalFields.forEach((value, key) => {
      encryptedKey = CryptoJS.AES.encrypt(key, encryptionKey).toString();
      encryptedValue = CryptoJS.AES.encrypt(value, encryptionKey).toString();
      encryptedFields[encryptedKey] = encryptedValue;
    });
    contact.additionalFields = encryptedFields;
  }

/**
 * Helper to decrypt the additionalFields property of a contact.
 * 
 * @param {Contact} contact - The contact to decrypt
 * @returns {Map<string, string>} - The decrypted additionalFields
 */
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
