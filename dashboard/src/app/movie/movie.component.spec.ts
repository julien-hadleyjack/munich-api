/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, Injectable} from '@angular/core';
import {MovieComponent} from './movie.component';
import {MovieService} from './movie.service';
import {FirebaseModule} from '../firebase.module';
import {Observable} from 'rxjs/Rx';
import {Movie} from '../model/movie';


@Injectable()
export class FakeMovieService {

  getMovies(): Observable<Movie[]> {
    return Observable.from([[
      {$key: '-KcKOSZNYDLB05sZ4Czv', orginal_language: false, subtitles: false, title: 'Manchester by the Sea'},
      {$key: '-KcKOSdE9QMRGAXNd_tL', orginal_language: true, subtitles: true, title: 'Elle'}
    ]]).map(Movie.fromJsonArray);
  }

}

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let de: DebugElement;
  let el: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
      declarations: [ MovieComponent ],
      providers: [{provide: MovieService, useClass: FakeMovieService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a card title', () => {
    de = fixture.debugElement.query(By.css('.card-title'));
    el = de.nativeElement;
    expect(el.textContent).toEqual(component.title);
  });

  it('should have at least one card (fakeAsync)', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(elements).not.toBeNull();
    expect(elements.length).toEqual(2);
    de = elements[0];
    el = de.nativeElement;
    expect(el.textContent.trim()).toEqual('Manchester by the Sea');
  }));

});
