import { Injectable } from '@angular/core';
import {of, Subject, throwError} from 'rxjs';
import {switchMap, catchError} from 'rxjs/operators';
import {User} from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new Subject<User>();
  private apiUrl = '/api/auth/';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    const loginCredentials = {email, password};
    console.log('User login credentials', loginCredentials);

    return this.httpClient.post<User>(`${this.apiUrl}login`, loginCredentials).pipe(
      switchMap(foundUser => {
        this.setUser(foundUser);
        console.log(`user found`, foundUser);
        return of(foundUser);
      }),
      catchError(e => {
        console.log(`Your login details could not be verified, please try again.`, e);
        return throwError(`Your login details could not be verified, please try again.`);
      })
    );
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
    // this.setUser(user);
    // console.log(`registered user succesfully`, user);
    // return of(user);

    return this.httpClient.post<User>(`${this.apiUrl}register`, user).pipe(
      switchMap( savedUser => {
        this.setUser(savedUser);
        console.log(`user reistered sucessfully`, savedUser);
        return of(savedUser);
      }),
      catchError (e => {
        console.log(`Server Error occured`, e);
        return throwError(`User Registration Failed, please contact admin`);
      })
    );
  }

  setUser(user) {
    this.user$.next(user);
  }
}
