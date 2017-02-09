import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CollapseDirective} from 'ng2-bootstrap';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CollapseDirective
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Munich Dashboard'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Munich Dashboard');
  }));

  it('should have a navbar title', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toEqual(fixture.componentInstance.title);
  }));

  it('should display the test title', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.title = 'Test Title';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toEqual('Test Title');
  }));
});
