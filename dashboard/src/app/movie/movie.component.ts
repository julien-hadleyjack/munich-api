import {Component, OnInit} from "@angular/core";
import {FirebaseListObservable} from "angularfire2";
import {MovieService, Movie} from "./movie.service";

@Component({
    moduleId: module.id,
    providers: [MovieService],
    selector: 'movie-overview',
    templateUrl: 'movie.component.html'
})
export class MovieComponent implements OnInit {

    movies: FirebaseListObservable<Movie[]>;

    constructor(private movieService: MovieService) {

    }

    ngOnInit() {
      this.movies = this.movieService.getMovies();
      //this.cinemas.subscribe(res => console.log(res));

    }

}
