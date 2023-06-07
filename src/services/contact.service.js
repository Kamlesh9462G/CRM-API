const {contacts} = require('../models')
const addContact = async (contactData) => {
    return await contacts.create(contactData)
}

module.exports = {
  addContact,
};