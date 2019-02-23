import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './_views/homepage/homepage.component';
import { BookComponent } from './_views/book/book.component';

const routes: Routes = [
  {
    path: '', 
    component: HomepageComponent
  },
  {
    path: 'book/:id', 
    component: BookComponent
  },
  { 
    path: '**', 
    component: HomepageComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
