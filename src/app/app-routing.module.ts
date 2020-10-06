import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamplePage1Component } from './example-page1/example-page1.component';
import { ExamplePage2Component } from './example-page2/example-page2.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

// add more routes here
// for relative route see docs: https://angular.io/guide/router
const routes: Routes = [
  {
    path: 'example1',
    component: ExamplePage1Component,
  },
  {
    path: 'example2',
    component: ExamplePage2Component,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
