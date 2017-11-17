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
     this.currentUser = this.userService.getCurrentUser();
  }

  users : User[] = [
    <User>{
      name: 'Admin A. Dmin',
      username: 'admin',
      password: '1234',
      email: 'admin@domain.com',
      admin: true,
      datasets: [
          {
            name: 'DATASET_01',
            label: 'First admin dataset',
            content: 'John; 23; M; 1.75; 75\n Mary; 21; F; 1.70; 64\n Paul; 32; M; 1.77; 81',
            separator: ';'    
          }
      ]
    },
    <User>{
      name: 'Adrian I. I.',
      username: 'aiasinschi',
      password: '54321',
      email: 'aiasinschi@domain.com',
      admin: false,
      datasets: [
          {
            name: 'DATASET_02',
            label: 'First Adrian dataset',
            content: 'John; 23; M; 1.75; 75\n Mary; 21; F; 1.70; 64\n Paul; 32; M; 1.77; 81',
            separator: ';'    
          },{
            name: 'DATASET_03',
            label: 'First Adrian dataset',
            content: 'John; 23; M; 1.75; 75\n Mary; 21; F; 1.70; 64\n Paul; 32; M; 1.77; 81',
            separator: ';'    
          }
      ]
    }
  ];

  auth_user = '';
  auth_pass = '';
  IS_USER_AUTH = false;
  currentUser: User;
  authenticate = function() {
      console.log(this.auth_user + '/' + this.auth_pass);
      this.userService.getAuthenticatedUser(this.auth_user, this.auth_pass).subscribe(user => {
        this.currentUser = user;
        console.log(this.currentUser);
        if (!this.currentUser) {
          this.currentUser = <User>{name: '', token: undefined};
        }
        this.IS_USER_AUTH = this.currentUser.token != undefined;
        /*this.cookieService.put('currentUser', JSON.stringify(this.currentUser));*/
        this.appModule.saveCurrentUser(this.currentUser);
      }
    );

  }
}
