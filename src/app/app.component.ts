import { Component } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-manager';
  users : User[] = [
    {
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
    {
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
}
