import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { DatasetComponent } from './dataset/dataset.component';
import { DatacolumnComponent } from './datacolumn/datacolumn.component';

import { User } from './user';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    DatasetComponent,
    DatacolumnComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor (public userService: UserService) { }
}
