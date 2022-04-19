// console.log('Hello!');

const contacts = require("./contacts");
// console.log(contacts);

const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const listContacts = await contacts.listContacts();
            console.table(listContacts);
            break;
 
        case 'get':
            const getContactById = await contacts.getContactById(id);
            console.table(getContactById);
            break;

        case 'add':
            const addContact = await contacts.addContact(name, email, phone);
            console.table(addContact);
            break;

        case 'remove':
            const removeContactById = await contacts.removeContact(id);
            if (!removeContactById) {
                throw new Error(`Contact id = ${id} is not found`);
            }
            console.log("Contact has been already deleted:");
            console.table(removeContactById);
            break;
        default:
        console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);

