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
  error: boolean = false;
  emptyQuery: boolean = false;
  query: String
  errorMessage = {
    title:'',
    subtitle:''
  };
  errors: any;
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
    this.errors = {
      noresults:{
        title:'No matching books' ,
        subtitle: "There weren't any books matching your search, try with another query",
      },
      serverError:{
        title:'Server Error' ,
        subtitle: "An error occurred",
      }
    };
    this.books = []
  }

  ngOnInit() {
    
  }
  get f() { return this.searchForm.controls; }
  loadOtherBooks(event){
    event.preventDefault()
    this.error = false
    this.searched = true
    this.loaders.books.visibility = true;
    let pagination = this.books.length + 1
    this.booksService
    .search(this.query, pagination)
    .subscribe((data: Config) => {
      //console.log(data)
      
      if(data.items.length>0){
        this.books = this.books.concat(this.booksService.mapBookCard(data.items));
      }
      //console.log(this.books)
      this.loaders.books.visibility = false;
    },
    (error: Config) =>{
      console.log(error)
      this.error = true
      this.errorMessage = this.errors.serverError
      this.loaders.books.visibility = false;
    });
  }
  search(){
    this.error = false
    let query = this.searchForm.value.query;
    this.query = query
    if(!query){
      this.emptyQuery = true
      return
    }
    this.emptyQuery = false
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
        this.books = this.booksService.mapBookCard(data.items);
      }else{
        this.error = true
        this.errorMessage = this.errors.noresults
      }
      //console.log(this.books)
      this.loaders.books.visibility = false;
    },
    (error: Config) =>{
      console.log(error)
      this.error = true
      this.errorMessage = this.errors.serverError
      this.loaders.books.visibility = false;
    });
  }
}
