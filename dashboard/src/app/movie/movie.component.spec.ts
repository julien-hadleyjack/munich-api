/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MovieComponent} from './movie.component';
import {MovieService} from './movie.service';
import {FirebaseModule} from '../firebase.module';


describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let de: DebugElement;
  let el: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
      declarations: [ MovieComponent ],
      providers: [MovieService]
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
});
