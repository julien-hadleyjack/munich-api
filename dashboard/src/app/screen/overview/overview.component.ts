import { Component, OnInit } from '@angular/core';
import {Cinema} from '../../model/cinema';

@Component({
  selector: 'app-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.css']
})
export class OverviewComponent implements OnInit {

  cinema_names = Cinema.NAMES;

  constructor() { }

  ngOnInit() {
  }

}
