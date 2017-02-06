import {Component, OnInit, Input} from "@angular/core";
import {MovieService} from "./movie.service";
import {Observable} from "rxjs";
import {Movie} from "../model/movie";
import "rxjs/operator/filter";
import "rxjs/operator/map";

@Component({
  moduleId: module.id,
  selector: 'movie-overview',
  templateUrl: 'movie.component.html'
})
export class MovieComponent implements OnInit {

  @Input()
  selectedCinema: string = 'city_kino';

  title: string = 'Movies';
  movies: Observable<Movie[]>;

  constructor(private movieService: MovieService) {

  }

  ngOnInit() {
    this.movies = this.movieService.getMovies(this.selectedCinema);
    this.movies.subscribe(res => console.log(res));

  }



}
