import { Component, OnInit, Input} from '@angular/core';
import { Quote } from '../models/quotes.model';
import { Tag } from '../models/tags.model';
import { QuoteServiceService } from '../service/quote-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule} from '@angular/common/http';
import { User } from '../models/users.model';
import { RouterModule } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-create-quote',
  imports: [    
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './create-quote.component.html',
  styleUrl: './create-quote.component.css'
})
export class CreateQuoteComponent implements OnInit {
  @Input() user!: User;

  tags!: Tag[];

  quote: Quote = {
      quoteId: Math.floor(Math.random() * 1000000),
      userId: 0, //this.user.userId,
      authorId: 0,
      authorFirst: "",
      authorLast: "",
      text: "",
      comments: "",
      dateAdded: new Date, 
      tags: []
  };

  wasSubmitted: boolean = false;

  constructor(private service: QuoteServiceService) { 
    console.log("Hello from create quote!");
    service.getAllTags((tags: Tag[]) => {
      this.tags = tags;
    });
  }

  ngOnInit() {
    //alert("Hello from create quote!");
    console.log("Hello from create quote!");
  }

  public onSubmit() {
    console.log("in submit, name="+this.quote.authorFirst);
    console.log(this.quote);
    this.quote.userId=this.service.getUser();
    let status = this.service.createQuote(this.quote, () => {
      console.log("Quote created.");
    });
    console.log("The return from createQuote() was " + status);
    alert("Quote Added!");
    window.location.assign("list-quotes");
  }

  onCheckboxChange(tag: Tag, event: Event) {
    console.log("in onCheckboxChange");
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.quote.tags.push(tag);
    }
    else {
      for (let i=0; i<this.quote.tags.length; i++) {
        if (this.quote.tags[i].name == tag.name) {
          this.quote.tags.splice(i,1);
          break;
        }
      }
    }
  }
}
