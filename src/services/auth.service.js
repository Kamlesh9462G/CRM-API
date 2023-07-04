const { users } = require("../models");

const signupAdmin = async (adminData) => {
  return await users.create(adminData);
};

// services/notesService.js

const { auth } = require("../observers/auth.observers");
class NotesService {
  async createNote(data) {
    try {
      const note = await users.create(data);
      auth.notifyObservers({ action: "create", data: note });
      return note;
    } catch (error) {
      throw error;
    }
  }

  async getNotes() {
    try {
      return await users.find();
    } catch (error) {
      throw error;
    }
  }

  async updateNote(id, data) {
    try {
      const note = await users.findByIdAndUpdate(id, data, { new: true });
      auth.notifyObservers({ action: "update", data: note });
      return note;
    } catch (error) {
      throw error;
    }
  }

  async deleteNote(id) {
    try {
      const note = await users.findByIdAndDelete(id);
      auth.notifyObservers({ action: "delete", data: note });
      return note;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new NotesService();

module.exports = {
  signupAdmin,
};
