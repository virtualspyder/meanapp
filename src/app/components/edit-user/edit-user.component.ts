import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';
import { ValidateService } from 'app/services/validate.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  users: any;
  userId: any;

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.users = this.authService.getUserData();
    this.name = this.users.name;
    this.username = this.users.username;
    this.email = this.users.email;
    this.password = this.users.password;
    this.userId = this.users._id;
    console.log(this.users);
    console.log(this.users._id);
    console.log(this.userId);
  }

  onEditUserSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,  
      userId: this.userId,
    }

    // Required Fields
    if (!this.validateService.validateUser(user)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.editUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Successfully Updated', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/users']);
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/users']);
      }
    });
    this.name = "";
    this.username = "";
    this.email = "";
    this.password = "";

  }
}
