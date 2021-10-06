import { makeAutoObservable, observable, computed, action, flow } from 'mobx';

class User {
  profile: { [key: string]: string | number } = {};
  auth: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  setProfile(values: {[key: string]: string | number}) {
    this.profile = {
      ...this.profile,
      ...values,
    };
  }

  setAuth(auth: any) {
    this.auth = auth;
  }
  get isAdmin() {
    const groups = this.auth?.signInUserSession?.accessToken?.payload["cognito:groups"] || [];
    return groups.includes('admin');
  }
}

export default User;