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

  displayQuoteList() {
    alert("Display list here!");
    this.router.navigate(['list-quotes'], { });
  }
  addQuote() {
    alert("Add quote here!");
    this.router.navigate(['create'], { });
  }

  signUp() {
    alert("Sign up!");
    this.router.navigate(['signup'], { });
  }

  login() {
    alert("Login!");
    this.router.navigate(['login'], { });
  }
}
