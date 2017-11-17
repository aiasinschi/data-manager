import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './service/user.service';
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /*private userService: UserService;*/
  title = 'data-manager';

  constructor(public userService: UserService) { }

  ngOnInit() {
      /*let custr = this.cookieService.get('currentUser');
      if (custr) {
          this.currentUser = JSON.parse(custr);
      }*/
     //this.currentUser = this.userService.getCurrentUser();
      //console.log(localStorage);
      let userStr = localStorage.getItem('CURRENT_USER');
      this.currentUser = JSON.parse(userStr);
      console.log(this.currentUser);
  }

  isUserAuthorized(): boolean {
      return this.currentUser && (this.currentUser.token);
  }

  auth_user = '';
  auth_pass = '';
  currentUser: User;
  authenticate = function() {
      console.log(this.auth_user + '/' + this.auth_pass);
      this.userService.getAuthenticatedUser(this.auth_user, this.auth_pass).subscribe(user => {
        this.currentUser = user;
        console.log(this.currentUser);
        if (!this.currentUser) {
          this.currentUser = <User>{name: '', token: null};
        }
        //this.userService.saveCurrentUser(this.currentUser);
        localStorage.setItem('CURRENT_USER', JSON.stringify(this.currentUser));
      }
    );
  }

  logout = function() {
      this.currentUser = null;
      localStorage.setItem('CURRENT_USER', '');
  }
}
