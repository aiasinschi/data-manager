import { Component, OnInit, Input } from '@angular/core';
import { Dataset } from '.';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {

  @Input() dataset: Dataset;  

  data: any[][];  
      
  constructor() { }

  ngOnInit() {
      let lines = this.dataset.content.split('\n');
      this.data  = [];
      for (let line of lines) {
          let row = line.split(this.dataset.separator);
          this.data.push(row);
      }
  }

}
