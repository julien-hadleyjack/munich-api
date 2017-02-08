import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OverviewComponent} from './screen/overview/overview.component';
import {WorkComponent} from './screen/work/work.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: '', redirectTo: '/overview', pathMatch: 'full'},
  { path: 'overview', component: OverviewComponent },
  { path: 'work', component: WorkComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
