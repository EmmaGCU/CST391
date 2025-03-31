import { Component, OnInit, Input} from '@angular/core';
import { Quote } from '../models/quotes.model';
import { Tag } from '../models/tags.model';
import { QuoteServiceService } from '../service/quote-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule} from '@angular/common/http';
import { User } from '../models/users.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [    
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = {
    userId: 0,
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  }

  wasSubmitted: boolean = false;

  constructor(private service: QuoteServiceService) { 
    console.log("Hello from login!");
  }

  ngOnInit() {
    //alert("Hello from create quote!");
    alert("Hello from login!");
  }

  public onSubmit() {
    console.log("in submit: login");

    console.log(this.user);
    let status = this.service.login(this.user, (user: User) => {
      if (user.password == this.user.password) {
        this.service.setUser(user.userId);
        console.log("User logged in.");
      }

    });
    console.log("The return from login() was " + status);
    this.wasSubmitted = true;
  }
}
