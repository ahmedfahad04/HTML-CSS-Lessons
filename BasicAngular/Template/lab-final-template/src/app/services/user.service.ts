import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  url: string | null = '';

  users: User[] = [
    // {name: 'Abir', roll: '1229', contact_no: '01924866584', email: 'bsse1229@iit.du.ac.bd', password: '1234', imageName: 'img3.jpg' },
    // {name: 'Galib', roll: '1205', contact_no: '0176610087', email: 'bsse1206@iit.du.ac.bd', password: '12345', imageName: 'img1.jpg' },
  ];

  addUser(user: User) {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    console.log(this.users);
  }

  getUsers() {
    var data = localStorage.getItem('users');
    console.log("USER: ",data?.length);
    return JSON.parse(data!);
  }

  setImageUrl(url: string) {
    this.url = url;
  }

  getImageUrl() {
    return this.url;
  }
}
