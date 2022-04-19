// contacts.js

const fs = require("fs/promises");
const path = require("path");

// Раскомментируй и запиши значение
const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const products = JSON.parse(data);
    return products;
}

async function getContactById(contactId) {
    const listContact = await listContacts();
    const result = listContact.find((item) => item.id === contactId);
    if (!result) {
        throw new Error(`Contact id=${contactId} is not found`);
    }
    return result;
}

async function removeContact(contactId) {
    const listContact = await listContacts();
    const deletedContact = listContact.find((item) => item.id === contactId);
    if (!deletedContact) {
        throw new Error(`Contact id=${contactId} is not found`);
    } else {
        const newListContact = listContact.filter((item) => item.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(newListContact));
    }
    return deletedContact;
}

async function addContact(name, email, phone) {
    const listContact = await listContacts();
    const newContact = { id: name, email, phone };
    const newOdj = [...listContact, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newOdj));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};