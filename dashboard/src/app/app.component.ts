import { Component } from '@angular/core';
import { Cinema } from './model/cinema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Munich Dashboard';
  cinema_names = Cinema.NAMES;
}
