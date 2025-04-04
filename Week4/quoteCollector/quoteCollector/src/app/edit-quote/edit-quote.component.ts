import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quote } from '../models/quotes.model';
import { Tag } from '../models/tags.model';
import { QuoteServiceService } from '../service/quote-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule} from '@angular/common/http';
import { User } from '../models/users.model';
import { RouterModule } from '@angular/router';
import { DisplayQuoteComponent } from '../display-quote/display-quote.component';

@Component({
  selector: 'app-edit-quote',
  imports: [    
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './edit-quote.component.html',
  styleUrl: './edit-quote.component.css'
})
export class EditQuoteComponent {
  @Input() quote!: Quote;
  @Output() reset = new EventEmitter<boolean>();

  tags!: Tag[];

  wasSubmitted: boolean = false;

  constructor(private service: QuoteServiceService) { 
    console.log("Hello from create quote!");
    service.getAllTags((tags: Tag[]) => {
      this.tags = tags;
      for (let allTag=0; allTag<this.tags.length; allTag++) {
        for (let quoteTag=0; quoteTag<this.quote.tags.length; quoteTag++) {
          if (this.quote.tags[quoteTag].tagId == this.tags[allTag].tagId) {
            this.tags[allTag].checked = true;
          }
        }
      }
    });
  }

  ngOnInit() {
    //alert("Hello from create quote!");
    console.log("Hello from create quote!");
  }

  public onSubmit() {
    console.log("in submit, name="+this.quote.authorFirst);
    console.log(this.quote);
    console.log(this.tags);
    let status = this.service.updateQuote(this.quote, () => {
      console.log("Quote updated.");
    });
    console.log("The return from updateQuote() was " + status);
    this.reset.emit(false);
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
