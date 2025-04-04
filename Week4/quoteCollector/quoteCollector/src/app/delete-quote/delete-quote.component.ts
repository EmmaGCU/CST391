import { Component, Input } from '@angular/core';
import { Quote } from '../models/quotes.model';
import { Tag } from '../models/tags.model';
import { QuoteServiceService } from '../service/quote-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule} from '@angular/common/http';
import { User } from '../models/users.model';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-delete-quote',
  imports: [    
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule],

  templateUrl: './delete-quote.component.html',
  styleUrl: './delete-quote.component.css'
})
export class DeleteQuoteComponent {
  @Input() quoteId!: number;

  constructor(private service: QuoteServiceService, public myapp: AppComponent) {}

  confirmDelete(quoteId: number) {
    console.log("quoteId: " + quoteId);
    if (confirm('Are you sure you want to delete this quote?')) {
      this.service.deleteQuote(quoteId, () => {});
      window.location.reload();
    }
  }
}
