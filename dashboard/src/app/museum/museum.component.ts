import {Component, OnInit, Input} from '@angular/core';
import {MuseumService} from './museum.service';
import {Observable} from 'rxjs';
import 'rxjs/operator/filter';
import 'rxjs/operator/map';
import {Museum} from '../model/museum';

@Component({
  moduleId: module.id,
  selector: 'museum-overview',
  templateUrl: 'museum.component.html'
})
export class MuseumComponent implements OnInit {

  title = 'Museums';
  museums: Observable<Museum[]>;

  constructor(private museumService: MuseumService) {

  }

  ngOnInit() {
    this.museums = this.museumService.getMuseums();
    this.museums.subscribe(res => console.log(res));

  }

}
