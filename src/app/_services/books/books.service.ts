import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { check_default, trimString, check_var} from '../../_global/global';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  API_KEY = environment.API_KEY;
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }
  getBook (id){
    return this.http.get(`${this.API_URL}/volumes/${id}`)
  }
  search (descr, index=0){
    let fields = "kind,totalItems,items(id,volumeInfo,volumeInfo/previewLink,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/publisher,volumeInfo/averageRating)"
    return this.http.get(`${this.API_URL}/volumes/?q=${descr}&fields=${fields}&maxResults=20&startIndex=${index}&key=${this.API_KEY}`)
  }
  mapBookCard(books){
    let bookServiceThis = this
    return books.map(function(element){
      let authors = ''
      let title = ''
      let imageUrl = ''
      if(check_var(element.volumeInfo.authors)){
        authors = bookServiceThis.mapAuthors(element.volumeInfo.authors)
      }
      if(check_var(element.volumeInfo.title)){
        title = trimString(element.volumeInfo.title, 60)
      }   
      imageUrl = bookServiceThis.setBookCover(element.volumeInfo.imageLinks)
      return {
        id: element.id,
        imageUrl: imageUrl,
        title: title,
        authors: authors,
        infoLink: check_default(element.volumeInfo.infoLink, ''),
        publisher: check_default(element.volumeInfo.publisher, ''),
        averageRating: check_default(element.volumeInfo.averageRating, 0)
      }
    })
  }
  mapAuthors(authors){
    //console.log(authors)
    return 'by ' + authors.join(', ')
  }
  setBookCover(el){
    if(check_var(el)){
      return check_default(el.thumbnail, 'assets/img/cover.png').replace('zoom=1', "zoom=2")
    }
      return 'assets/img/cover.png'
  } 
}
