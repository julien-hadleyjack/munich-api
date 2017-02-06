import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {FirebaseModule} from "./firebase.module";
import {MovieComponent} from "./movie/movie.component";
import {AlertModule} from "ng2-bootstrap";
import {MovieService} from "./movie/movie.service";


@NgModule({
    bootstrap: [AppComponent],
    imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    FirebaseModule
  ],
  declarations: [
    AppComponent,
    MovieComponent
  ],
  providers: [MovieService]
})
export class AppModule { }
