import {async, ComponentFixture, TestBed, tick, fakeAsync} from '@angular/core/testing';
import {MuseumComponent} from './museum.component';
import {MuseumService} from './museum.service';
import {FirebaseModule} from '../firebase.module';
import {Observable} from 'rxjs/Rx';
import {DebugElement, Injectable} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Museum} from '../model/museum';


@Injectable()
export class FakeMuseumService {

  getMuseums(): Observable<Museum[]> {
    return Observable.from([[
      {$key: '-KcUUlPH6BbE1uNvY3wt', name: 'Archiv Geiger', address: 'Muttenthalerstraße, 81477 München', price: {default: 0}},
      {$key: '-KcUUlRrDkahSv79sT8J', name: 'Artothek & Bildersaal', address: 'Rosental 16, 80331 München', price: {default: 0}},
      {$key: '-KcUUlUOUw6FWhJI5Bun', name: 'Bayerische Staatsbibliothek', address: 'Ludwigstr. 16, 80539 München', price: {default: 0}}
    ]]).map(Museum.fromJsonArray);
  }

}


describe('MuseumComponent', () => {
  let component: MuseumComponent;
  let fixture: ComponentFixture<MuseumComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModule],
      declarations: [ MuseumComponent ],
      providers: [{provide: MuseumService, useClass: FakeMuseumService}]
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


  it('should have at least one card', () => {
    const museumService = TestBed.get(MuseumService);
    museumService.getMuseums().toPromise().then(() => {

      de = fixture.debugElement.query(By.css('.list-group-item'));
      el = de.nativeElement;
      expect(el.textContent.trim()).toEqual('Archiv Geiger');
    });

  });

  it('should have at least one card (fakeAsync)', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.list-group-item'));
    el = de.nativeElement;
    expect(el.textContent.trim()).toEqual('Archiv Geiger');
  }));

  it('should have at least one card (async)', async(() => {

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const elements = fixture.debugElement.queryAll(By.css('.list-group-item'));
      expect(elements).not.toBeNull();
      expect(elements.length).toEqual(3);
      de = elements[0];
      el = de.nativeElement;
      expect(el.textContent.trim()).toEqual('Archiv Geiger');
    });
  }));

  it('should have at least one card (fakeAsync)', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(elements).not.toBeNull();
    expect(elements.length).toEqual(3);
    de = elements[0];
    el = de.nativeElement;
    expect(el.textContent.trim()).toEqual('Archiv Geiger');
  }));

});
