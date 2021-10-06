import { createContext } from 'react';
import User from './user';

class Store {
  user;

  constructor() {
    this.user = new User();
  }
}

export default createContext(new Store());