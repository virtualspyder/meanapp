import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  name: String;
  username: String;
  email: String;
  password: String;
  added: boolean;

  constructor(private authService: AuthService,
    private router: Router, private flashMessage: FlashMessagesService) {
     }

  ngOnInit() {
    this.authService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    }, err => {
      console.log(err);
      return false;
    });
  }

  onEditUser(user: any) {
    this.authService.storeUser(user);
    this.router.navigate(['edituser']);
  }

  onDeleteUser(user: any) {
    this.authService.deleteUser(user._id).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('User deleted.',{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/users']);
      } else {
        this.router.navigate(['/users']);
      }
    });
  }


}
