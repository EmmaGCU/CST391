import { Component, Input } from '@angular/core';
import { Quote } from '../models/quotes.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-display-quote',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './display-quote.component.html',
  styleUrl: './display-quote.component.css'
})
export class DisplayQuoteComponent {
  @Input() quote!: Quote;
}
