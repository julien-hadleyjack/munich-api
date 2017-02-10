import {Component, OnInit, Input} from '@angular/core';
import {MovieService} from './movie.service';
import {Observable} from 'rxjs/Observable';
import {Movie} from '../model/movie';
import 'rxjs/operator/filter';
import 'rxjs/operator/map';

@Component({
  selector: 'movie-overview',
  templateUrl: 'movie.component.html'
})
export class MovieComponent implements OnInit {

  @Input()
  selectedCinema = 'city_kino';

  title = 'Movies';
  movies$: Observable<Movie[]>;

  constructor(private movieService: MovieService) {

  }

  ngOnInit() {
    this.movies$ = this.movieService.getMovies(this.selectedCinema);
  }

}
