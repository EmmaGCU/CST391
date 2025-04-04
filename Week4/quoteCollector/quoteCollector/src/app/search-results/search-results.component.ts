import { Component, OnInit, Input} from '@angular/core';
import { Quote } from '../models/quotes.model';
import { Tag } from '../models/tags.model';
import { QuoteServiceService } from '../service/quote-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule} from '@angular/common/http';
import { User } from '../models/users.model';
import { RouterModule } from '@angular/router';
import { Search } from '../models/search.model';
import { DisplayQuoteComponent } from '../display-quote/display-quote.component';

@Component({
  selector: 'app-search-results',
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    DisplayQuoteComponent
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  @Input() quotes: Quote[] = [];
  selectedQuote: Quote | null = null;

  onSelectQuote(quote:Quote) {
    this.selectedQuote = quote;
  }

  constructor(private service: QuoteServiceService) {}
}
