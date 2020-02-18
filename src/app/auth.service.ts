import { Injectable } from '@angular/core';
import {of, Subject} from 'rxjs';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new Subject<User>();
  constructor() { }

  login(email: string, password: string) {
    const loginCredentials = {email, password};
    console.log('User login credentials', {email, password});
    return of({email, password});
  }
  logout() {
    // clean up subject or remove user from subject
    this.setUser(null);
    console.log('User Logged out succesfully');
  }

  getUser() {
    return this.user$.asObservable();
  }
  register(user: any) {
    // make a api call and save to db
    // update the user subject
    this.setUser(user);
    console.log(`registered user succesfully`, user);
    return of(user);

  }
  setUser(user) {
    this.user$.next(user);
  }
}
