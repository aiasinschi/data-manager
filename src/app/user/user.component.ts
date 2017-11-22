import { Component, OnInit, Input } from '@angular/core';
import { DatasetComponent } from '../dataset/dataset.component';
import { User } from '.';
import { Datacolumn } from '../datacolumn';
import { DataTypes } from '../datatypes';

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
  ds_headers = false;
  dataColumns: Datacolumn[] = [];

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
        const sep = this.ds_separator;
        const hasHeaders = this.ds_headers;
        const caller = this;
        reader.onload = function (evt: any) {
            caller.dataColumns = [];
            const result = evt.target.result;
            console.log(result);
            const lines = result.split('\n');
            const headers = lines[0].split(sep);
            let idx = 1;
            for (let val of headers){
                val = val.trim();
                caller.dataColumns.push(<Datacolumn>{
                    name: hasHeaders ? val : ('VAR' + idx),
                    label: hasHeaders ? val : ('Variable ' + idx),
                    type: DataTypes.TEXT
                });
                idx ++;
            }
            console.log(caller.dataColumns);
        };
        reader.readAsText(file, 'UTF-8');
      }
  }
}
