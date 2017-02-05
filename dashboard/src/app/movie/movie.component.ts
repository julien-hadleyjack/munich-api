import {Component, OnInit} from "@angular/core";
import {MovieService} from "./movie.service";
import {Observable} from "rxjs";
import {Movie} from "../model/movie";
import "rxjs/operator/filter";
import "rxjs/operator/map";

@Component({
    moduleId: module.id,
    providers: [MovieService],
    selector: 'movie-overview',
    templateUrl: 'movie.component.html'
})
export class MovieComponent implements OnInit {

  title: string = 'Movies';

    movies: Observable<Movie[]>;

    constructor(private movieService: MovieService) {

    }

    ngOnInit() {
      this.movies = this.movieService.getMovies()
        .map(movies => movies.filter(movie => movie.orginal_language));
      this.movies.subscribe(res => console.log(res));

    }

}
