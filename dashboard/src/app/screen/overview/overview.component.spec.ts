import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OverviewComponent} from './overview.component';
import {MovieComponent} from '../../movie/movie.component';
import {MuseumComponent} from '../../museum/museum.component';
import {MovieService} from '../../movie/movie.service';
import {FirebaseModule} from '../../firebase.module';
import {MuseumService} from '../../museum/museum.service';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
      declarations: [ OverviewComponent, MovieComponent, MuseumComponent ],
      providers:    [ MovieService, MuseumService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
