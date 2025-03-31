import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My Music Collection';
  version = 1.0

  constructor(private router: Router) {}

  displayVersion() {
    alert(this.version);
  }

  displayArtistList() {
    alert("Display list here!");
    this.router.navigate(['list-artists'], { });
  }
}
