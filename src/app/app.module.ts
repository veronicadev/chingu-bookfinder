import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

/* COMPONENTS*/
import { BookCardComponent } from './_components/book-card/book-card.component';

/* VIEWS*/
import { HomepageComponent } from './_views/homepage/homepage.component';
import { LoaderComponent } from './_components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    BookCardComponent,
    HomepageComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
