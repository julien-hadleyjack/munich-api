import {AngularFireDatabase} from 'angularfire2';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Museum} from '../model/museum';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';



@Injectable()
export class MuseumService {

  constructor(private db: AngularFireDatabase) {
  }

  getMuseums(): Observable<Museum[]> {
    return this.db.list('museums/')
      .map(Museum.fromJsonArray)
      .do(console.log);

  }

}
