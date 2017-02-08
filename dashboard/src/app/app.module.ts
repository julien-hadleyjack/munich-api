import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FirebaseModule} from './firebase.module';
import {MovieComponent} from './movie/movie.component';
import {AlertModule, CollapseDirective} from 'ng2-bootstrap';
import {MovieService} from './movie/movie.service';
import {MuseumComponent} from './museum/museum.component';
import {MuseumService} from './museum/museum.service';
import {OverviewComponent} from './screen/overview/overview.component';
import {WorkComponent} from './screen/work/work.component';
import {RouterState} from '@angular/router';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
    AlertModule.forRoot(),
    FirebaseModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    MovieComponent,
    MuseumComponent,
    OverviewComponent,
    WorkComponent,
    CollapseDirective
  ],
  providers: [
    MovieService,
    MuseumService,
  ]
})
export class AppModule { }
