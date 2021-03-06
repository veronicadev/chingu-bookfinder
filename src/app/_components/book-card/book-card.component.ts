import { Component, OnInit } from '@angular/core';
import { BookCard } from '../../_interfaces/book-card';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book: BookCard

  constructor() { }

  ngOnInit() {
  }

}
