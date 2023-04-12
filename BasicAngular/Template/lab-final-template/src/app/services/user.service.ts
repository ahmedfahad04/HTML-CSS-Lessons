import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  users: User[] = [
    {name: 'Abir', roll: '1229', contact_no: '01924866584', email: 'bsse1229@iit.du.ac.bd', password: '1234' },
    {name: 'Galib', roll: '1205', contact_no: '0176610087', email: 'bsse1206@iit.du.ac.bd', password: '12345' },
  ];

  addUser(user: User) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }
}
