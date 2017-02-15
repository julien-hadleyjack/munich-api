import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Work } from '../pages/work/work';
import {FirebaseModule} from './firebase.module';
import {MovieComponent} from '../movie/movie.component';
import {MovieService} from '../movie/movie.service';
import {MuseumComponent} from '../museum/museum.component';
import {MuseumService} from '../museum/museum.service';

@NgModule({
  declarations: [
    MyApp,
    Dashboard,
    Work,
    MovieComponent,
    MuseumComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FirebaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Dashboard,
    Work
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieService,
    MuseumService
    ]
})
export class AppModule {}
