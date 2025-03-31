import { Component, Input, OnInit } from '@angular/core';
import { QuoteServiceService } from '../service/quote-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Quote } from '../models/quotes.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/users.model';
import { DisplayQuoteComponent } from "../display-quote/display-quote.component";

@Component({
  selector: 'app-list-quotes',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    DisplayQuoteComponent
],
  templateUrl: './list-quotes.component.html',
  styleUrl: './list-quotes.component.css'
})
export class ListQuotesComponent implements OnInit {
  selectedQuote: Quote | null = null;
  quotes: Quote[] = [];

  constructor(private route: ActivatedRoute, private service: QuoteServiceService) {
  }

  ngOnInit(): void {
    console.log("Getting data....");
    this.service.getQuotes((quotes: Quote[]) => {
      this.quotes = quotes;
      console.log("quotes: ", this.quotes);
    });
  }

  onSelectQuote(quote:Quote) {
    this.selectedQuote = quote;
  }
}
