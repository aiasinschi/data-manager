import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { DatasetComponent } from './dataset/dataset.component';
import { DatacolumnComponent } from './datacolumn/datacolumn.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    DatasetComponent,
    DatacolumnComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
