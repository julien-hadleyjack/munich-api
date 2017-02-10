import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Cinema} from '../../model/cinema';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {

  cinema_names = Cinema.NAMES;

  constructor(public navCtrl: NavController) {

  }

}
