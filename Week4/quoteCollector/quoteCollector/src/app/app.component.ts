import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Quote Collector';

  constructor(private router: Router) {}

  search() {
    this.router.navigate(['search'], {});
  }

  displayQuoteList() {
    this.router.navigate(['list-quotes'], { });
  }
  addQuote() {
    this.router.navigate(['create'], { });
  }

  signUp() {
    this.router.navigate(['signup'], { });
  }

  login() {
    this.router.navigate(['login'], { });
  }
}
