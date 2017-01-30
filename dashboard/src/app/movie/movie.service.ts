import {AngularFireDatabase, FirebaseListObservable} from "angularfire2";
import {Injectable} from "@angular/core";


export class Movie {
  orginal_language: boolean;
  subtitles: boolean;
  title: boolean;
}

@Injectable()
export class MovieService {

  constructor(private db:AngularFireDatabase) {
  }

  getMovies(): FirebaseListObservable<Movie[]> {
    return this.db.list('movies/city_kino');
  }

}
