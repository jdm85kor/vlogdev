import User from './user';
import Vlog from './vlog';

export default class Store {
  user;
  vlog;

  constructor() {
    this.user = new User();
    this.vlog = new Vlog();
  }
}