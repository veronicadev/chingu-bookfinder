import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { checkDefault, trimString } from '../../_components/global/global';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  API_KEY = environment.API_KEY;
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }
  getBook (id){
    return this.http.get(`${this.API_URL}/volumes/$${id}&key=${this.API_KEY}`)
  }
  search (descr){
    return this.http.get(`${this.API_URL}/volumes/?q=${descr}&max_results=20&key=${this.API_KEY}`)
  }
  mapBookCard(books){
    let bookServiceThis = this
    return books.map(function(element){
      let authors = ''
      let title = ''
      let averageRating
      let imageUrl = ''
      if(checkDefault(element.volumeInfo.authors)){
        authors = bookServiceThis.mapAuthors(element.volumeInfo.authors)
      }
      if(checkDefault(element.volumeInfo.title)){
        title = trimString(element.volumeInfo.title, 60)
      }
      if(checkDefault(element.volumeInfo.averageRating)){
        averageRating = element.volumeInfo.averageRating
      }else{
        averageRating = 0
      }
      if(checkDefault(element.volumeInfo.imageLinks)){
        console.log('qui')
        imageUrl = element.volumeInfo.imageLinks.smallThumbnail
      }else{
        imageUrl = ''
      }
    
      return {
        id: element.id,
        imageUrl: imageUrl,
        title: title,
        authors: authors,
        publisher: checkDefault(element.volumeInfo.publisher),
        averageRating: averageRating
      }
    })
  }
  mapAuthors(authors){
    //console.log(authors)
    return 'by ' + authors.join(', ')
  }
}
