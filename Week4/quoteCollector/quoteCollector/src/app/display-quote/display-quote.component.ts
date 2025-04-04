import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Quote } from '../models/quotes.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EditQuoteComponent } from '../edit-quote/edit-quote.component';
import { DeleteQuoteComponent } from "../delete-quote/delete-quote.component";

@Component({
  selector: 'app-display-quote',
  imports: [CommonModule, RouterModule, HttpClientModule, EditQuoteComponent, DeleteQuoteComponent],
  templateUrl: './display-quote.component.html',
  styleUrl: './display-quote.component.css'
})
export class DisplayQuoteComponent implements OnInit{
  @Input() quote!: Quote;
  displayDate!: string;
  @Output() returnToList = new EventEmitter<null>;

  ngOnInit(): void {
      this.displayDate = this.quote.dateAdded.toString().substring(0,10);
  }

  editMode: Boolean = false;

  editQuote() {
    this.editMode = true;
  }

  backToList() {
    this.returnToList.emit(null);
  }
}
