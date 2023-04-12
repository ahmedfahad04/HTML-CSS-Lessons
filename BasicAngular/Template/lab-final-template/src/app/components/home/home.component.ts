import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  total_user: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) { this.total_user = this.userService.users.length; };

  addUserNavigate() {
    this.router.navigate(['AddUser']);
  }

  showUsersNavigate() {
    this.router.navigate(['ShowUsers']);
  }

}
