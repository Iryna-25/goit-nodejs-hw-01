// console.log('Hello!');

// index.js
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

const contactsOperations = require("./contacts");
// console.log(contactsOperations);

// // TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone })  => {
    switch (action) {
        case 'listContacts':
            const contacts = await contactsOperations.listContacts();
            console.table(contacts);
            break;
 
        case 'getContactById':
            const contact = await contactsOperations.getContactById(id);
            console.log(contact);
            break;

        case 'addContact':
            const newContact = await contactsOperations.addContact(name, email, phone);
            console.table(newContact);
            break;

        case 'removeContact':
            const removeContact = await contactsOperations.removeContact(id);
            // if (!removeContactById) {
            //     throw new Error(`Contact id = ${id} is not found`);
            // }
            // console.log("Contact has been already deleted:");
            console.table(removeContact);
            break;
        default:
        console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);

// const action = process.argv.find(item => item == "--action");
// if (action !== -1 ) {
//     const actionName = process.argv[action + 1];
//     invokeAction({action})    
// }


// (async () => {
//     try {
//         await invokeAction(argv);
//     } catch (error) {
//         console.log(`Error: ${error.message}`);
//     }
// })();

// invokeAction({ action: "listContacts" });
// invokeAction({ action: "getContactById", id: "5" });
// invokeAction({ action: "addContact", name: "RChaimr Lewis", email: "udui.in@egetlacus.ca", phone: "(294) 040-6685" });
// invokeAction({ action: "removeContact", id: "5" });
