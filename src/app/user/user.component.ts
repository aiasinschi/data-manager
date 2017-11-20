import { Component, OnInit, Input } from '@angular/core';
import { DatasetComponent } from '../dataset/dataset.component';
import { User } from '.';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  datasetDialogVisible = false;
  ds_label = 'Dataset label';
  ds_name = 'Dataset_name';
  ds_separator = ';';
  ds_file: any;

  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

  showLoadDatasetDialog () {
      this.datasetDialogVisible = true;
  }

  cancelDataset () {
      this.datasetDialogVisible = false;
  }

  saveDataset () {
      this.datasetDialogVisible = false;
      console.log('saving dataset... maybe later');
  }

  addDataFile(event) {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        console.log(file);
        this.ds_file = file.name;
        const reader = new FileReader();
        reader.onload = function (evt: any) {
            const result = evt.target.result;
            console.log(result);
        };
        reader.readAsText(file, 'UTF-8');
      }
  }
}
