import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {FirebaseModule} from "./firebase.module";
import {MovieComponent} from "./movie/movie.component";
import {AlertModule} from "ng2-bootstrap";


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    FirebaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
