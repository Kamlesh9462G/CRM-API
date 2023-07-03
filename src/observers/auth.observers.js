// observers/crudObserver.js

const { Observable } = require("rxjs");

class ObservableSubject extends Observable {
  constructor() {
    super();
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class CRUDObserver {
  update(data) {
    console.log("Received notification:", data);
    // You can perform additional actions based on the CRUD operation here
  }
}

const subject = new ObservableSubject();
const observer = new CRUDObserver();
subject.addObserver(observer);

module.exports = { subject };
