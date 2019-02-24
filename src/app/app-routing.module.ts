import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './_views/homepage/homepage.component';

const routes: Routes = [
  {
    path: '', 
    component: HomepageComponent
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
