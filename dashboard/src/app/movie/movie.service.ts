import {AngularFireDatabase} from "angularfire2";
import {Injectable} from "@angular/core";
import {Movie} from "../model/movie";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";


@Injectable()
export class MovieService {

  constructor(private db:AngularFireDatabase) {
  }

  getMovies(): Observable<Movie[]> {
    return this.db.list('movies/city_kino')
      .map(Movie.fromJsonArray);
      // .do(console.log)

  }

}
