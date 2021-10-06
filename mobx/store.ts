import User from './user';

export default class Store {
  user;

  constructor() {
    this.user = new User();
  }
}