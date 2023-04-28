import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent {

  all_users: User[] = [];
  url: string | null = '';

  constructor(
    private userServices: UserService
  ) {

    this.all_users = this.userServices.getUsers();
    console.log(this.all_users);

    this.url = this.userServices.getImageUrl();
  }
  
  
  clearCache(): any

}
