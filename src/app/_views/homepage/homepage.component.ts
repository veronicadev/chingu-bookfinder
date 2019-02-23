import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../_services/books/books.service';
import { Config } from 'protractor';
import { BookCard } from '../../_interfaces/book-card';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { HostBinding } from '@angular/core';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.4s ease', keyframes([
            style({opacity: 0, transform: 'translateY(75%)', offset: 0}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class HomepageComponent implements OnInit {
  searchForm: FormGroup;
  @HostBinding('@listAnimation')
  loaders: any = {
    books: {
      visibility: false
    }
  }
  searched: boolean = false
  books: Array<BookCard>
  totalBooks: Number
  constructor(private booksService: BooksService) {
    this.searchForm = new FormGroup({
      query: new FormControl(null, Validators.required),
    });
    this.books = []
  }

  ngOnInit() {
    
  }
  get f() { return this.searchForm.controls; }

  search(){
    let query = this.searchForm.value.query;
    if(!query){
      return
    }
    //console.log(query)
    this.searched = true
    this.loaders.books.visibility = true;
    this.booksService
    .search(query)
    .subscribe((data: Config) => {
      //console.log(data)
      
      this.totalBooks = data.totalItems
      this.books = []
      if(this.totalBooks>0){
        //console.log(data.items)
        this.books = this.booksService.mapBookCard(data.items);
      }
      //console.log(this.books)
      this.loaders.books.visibility = false;
    });
  }
}
