import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShopComponent } from "./shop/shop.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'simpleapp';
}
