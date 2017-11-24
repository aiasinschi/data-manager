import { Component, OnInit, Input } from '@angular/core';
import { DatasetComponent } from '../dataset/dataset.component';
import { User } from '.';
import { UserService } from '../service/user.service';
import { Dataset } from '../dataset';
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
  ds_data: any[];

  @Input() user: User;
  constructor(public userService: UserService) { }

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
      if (this.ds_headers) {
          this.ds_data = this.ds_data.splice(1);
      }
      const dataset = <Dataset> {
          name: this.ds_name,
          label: this.ds_label
      };
      this.userService.addDatasetForUser(dataset, this.user, this.dataColumns, this.ds_data).subscribe(res => console.log(res));
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
            caller.ds_data = lines;
            const headers = lines[0].split(sep);
            let idx = 1;
            let headerSet = new Set();
            for (let val of headers){
                val = val.trim();
                if (hasHeaders) {
                    if (headerSet.has(val)) {
                        val = val + `_${idx}`;
                    }
                    headerSet.add(val);
                }
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
