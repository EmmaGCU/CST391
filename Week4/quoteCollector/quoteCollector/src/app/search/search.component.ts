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
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-search',
  imports: [    
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    SearchResultsComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  keyword: string = "";
  author: string = "";
  tags: Tag[] = [];
  selectedTags: Tag[] = [];
  comments = {
    with: false,
    without: false,
    all: true
  }

  search: Search = {
    keyword: this.keyword,
    author: this.author,
    tags: this.selectedTags,
    comments: this.comments
  }

  quotes: Quote[] = [];

  constructor(private service: QuoteServiceService) { 
    console.log("Hello from search!");
    service.getAllTags((tags: Tag[]) => {
      this.tags = tags;
    });
  }

  onSubmit() {
    //alert("Submitted");
    //alert(JSON.stringify(this.search));
    this.service.searchQuotes(this.search, (quotes: Quote[]) => {
      //console.log(quotes);
      this.quotes=quotes;
      //alert(JSON.stringify(this.quotes));
    });
  }

  onCheckboxChange(tag: Tag, event: Event) {
    console.log("in onCheckboxChange");
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedTags.push(tag);
    }
    else {
      for (let i=0; i<this.selectedTags.length; i++) {
        if (this.selectedTags[i].name == tag.name) {
          this.selectedTags.splice(i,1);
          break;
        }
      }
    }
  }

  onSelectComments(box: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (box == 'comments') {
      this.comments.with = isChecked;
    }
    else {
      this.comments.without = isChecked
    }
    if ((this.comments.with && this.comments.without) || (!this.comments.with && !this.comments.without)) {
      this.comments.all = true;
    }
    else {
      this.comments.all = false;
    }
  }
}
