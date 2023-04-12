import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ShowUsersComponent } from './components/show-users/show-users.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"AddUser", component: AddUserComponent },
  {path:"ShowUsers", component: ShowUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
