import { Injectable } from '@angular/core';
import { Quote } from '../models/quotes.model'
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteServiceService {
  constructor(private http: HttpClient) { }

  private host = "http://localhost:3000";
  private static user: number = 0;

  public getQuotes(callback: (quotes: Quote[]) => void): void { //get a list of all quotes
    this.http.get<Quote[]>(this.host + "/quotes?userId=" + QuoteServiceService.user).
      subscribe((quotes: Quote[]) => {
        callback(quotes);
      });
  }

  public getQuote(callback:(quote: Quote) => void, id: number): void { //retrieve a quote based on its Id
    this.http.get<Quote>(this.host + "/quotes?id="+id).
      subscribe((quote: Quote) => {
        callback(quote);
      });
  }

  /*public getQuotesOfUser(userId: number, callback: (albums: Album[]) => void): void { //get all albums by a given artist
    let request = this.host + '/albums/' + artistName;
    console.log('request', request);
    this.http.get<Album[]>(request).
      subscribe((albums: Album[]) => {
        console.log(albums);
        callback(albums);
      });
  }*/

  public createQuote(quote: Quote, callback: () => void): void { //create a new quote
    // Add a new quote to the list of quotes
    this.http.post<Quote>(this.host + "/quotes", quote).
      subscribe((data) => {
        callback();
      });
  }

  public updateQuote(quote: Quote, callback: () => void): void {
    this.http.put<Quote>(this.host + "/quotes", quote).
      subscribe((data) => {
        callback();
      });
  }

  public deleteQuote(id: number, callback: () => void): void {
    this.http.delete(this.host + "/quotes/" + id).
      subscribe((data) => {
        callback();
      });
  }

  public signup(user: User, callback: () => void): void {
    this.http.post(this.host + "/users", user).
      subscribe((data) => {
        callback();
      });
  }

  public login(user: User, callback: (user: User) => void): void {
    this.http.get<User[]>(this.host + "/users?username=" + user.username).
      subscribe((foundUsers: User[]) => {
        if (foundUsers.length == 0) console.log("No users returned from API call");
        alert("user: " + JSON.stringify(foundUsers[0]));
        callback(foundUsers[0]);
      });
  }

  public setUser(userId: number) {
    QuoteServiceService.user = userId;
    alert("User logged in: " + QuoteServiceService.user);
  }

  public getUser() {
    return QuoteServiceService.user;
  }
}
