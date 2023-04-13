import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

  userInfo: any = User;
  userForm: any = FormGroup;  // step 1 [step 0: add ReactiveForm in app.module.ts]
  imageFile: any;

  url = "../assets/images/img1.jpg";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({  // step 2
      name: [''],
      roll: [''],
      contact_no: [''],
      email: [''],
      password: [''],
      pic: [''],
    });
  }

  onFileSelection(event: any) {
    this.imageFile = <File>event.target.files[0];
    console.log("FILE: ", this.imageFile);

    if(event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        // console.log(this.url)
        // this.userService.setImageUrl(this.url);
        // this.imageFile = this.imageFile.name;
      }
    }
  }

  onSubmit() {
    this.router.navigate(['home']);
    var formData = this.userForm.value;
    // formData.append('pic', this.imageFile, this.imageFile.name);


    var data = {
      name: formData.name,
      roll: formData.roll,
      contact_no: formData.contact_no,
      email: formData.email,
      password: formData.password,
      imageName: this.imageFile
    }

    this.userService.addUser({name: data.name, roll: data.roll, contact_no: data.contact_no, email: data.email, password: data.password, imageName: this.url});
    this.router.navigate(['ShowUsers']);
  }

}
