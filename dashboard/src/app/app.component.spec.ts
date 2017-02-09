import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CollapseDirective} from 'ng2-bootstrap';
import {NO_ERRORS_SCHEMA, DebugElement} from '@angular/core';
import {click, RouterStub} from '../../testing/index';
import {Router} from '@angular/router';
import {isPresent} from '@angular/core/src/facade/lang';
import {RouterLinkStubDirective} from '../../testing/router-stubs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CollapseDirective,
        RouterLinkStubDirective
      ],
      providers: [{provide: Router, useClass: RouterStub}],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'Munich Dashboard'`, async(() => {
    // fixture.detectChanges();
    expect(component.title).toEqual('Munich Dashboard');
  }));

  it('should have a navbar title', async(() => {
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;

    expect(el.querySelector('.navbar-brand').textContent).toEqual(fixture.componentInstance.title);
  }));

  it('should display the test title', async(() => {
    de = fixture.debugElement;
    el = de.nativeElement;

    component.title = 'Test Title';
    fixture.detectChanges();
    expect(el.querySelector('.navbar-brand').textContent).toEqual('Test Title');
  }));

  it('should navigate to work', () => {
    fixture.detectChanges();

    de = fixture.debugElement.query((e) => isPresent(e.nativeElement) ? e.nativeElement.textContent === 'Work' : false);
    el = de.nativeElement;

    const routerLink = de.injector.get(RouterLinkStubDirective);
    expect(routerLink.navigatedTo).toBeNull('link should not have navigated yet');

    click(el);
    fixture.detectChanges();

    expect(routerLink.navigatedTo).toBe('/work');

  });

});
