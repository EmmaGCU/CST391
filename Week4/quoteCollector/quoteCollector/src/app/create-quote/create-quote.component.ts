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
  }

  ngOnInit() {
    //alert("Hello from create quote!");
    console.log("Hello from create quote!");
  }

  public onSubmit() {
    console.log("in submit, name="+this.quote.authorFirst);
    // Parse the Tracks and add to the Album then call the Service to create the new Album
    /*let tracks: Track[] = [];
    let tracksAll = this.tracksRaw.split('\n');
    for (let i = 0; i < tracksAll.length; ++i) {
      let title = "";
      let lyrics = "";
      let video = "";
      let trackInfo = tracksAll[i];
      let trackParts = trackInfo.split(':');
      if (trackParts.length == 3) {
        title = trackParts[0];
        lyrics = trackParts[1];
        video = trackParts[2];
      }
      else if (trackParts.length == 2) {
        title = trackParts[0];
        lyrics = trackParts[1];
      }
      else {
        title = trackParts[0];
      }
      tracks.push(
        { trackId: Math.floor(Math.random() * 1000000), number: i + 1, title, lyrics, video }
      );
    }
    this.album.tracks = tracks;*/
    console.log(this.quote);
    let status = this.service.createQuote(this.quote, () => {
      console.log("Quote created.");
    });
    console.log("The return from createQuote() was " + status);
    this.wasSubmitted = true;
  }
}
