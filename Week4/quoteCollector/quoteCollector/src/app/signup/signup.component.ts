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
  selector: 'app-signup',
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: User = {
    userId: 0,
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  }

  wasSubmitted: boolean = false;

  constructor(private service: QuoteServiceService) { 
    console.log("Hello from signup!");
  }

  ngOnInit() {
    //alert("Hello from create quote!");
    alert("Hello from signup!");
  }

  public onSubmit() {
    console.log("in submit: signup");

    console.log(this.user);
    let status = this.service.signup(this.user, () => {
      console.log("User created.");
    });
    console.log("The return from createQuote() was " + status);
    this.wasSubmitted = true;
  }
}
