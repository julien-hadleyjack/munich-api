import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MuseumComponent} from './museum.component';
import {MuseumService} from './museum.service';
import {FirebaseModule} from '../firebase.module';


describe('MuseumComponent', () => {
  let component: MuseumComponent;
  let fixture: ComponentFixture<MuseumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
      declarations: [ MuseumComponent ],
      providers: [MuseumService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
