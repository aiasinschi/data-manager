import { Component, OnInit, Input } from '@angular/core';
import { DatasetComponent } from '../dataset/dataset.component';
import { User } from '.';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
