import { Routes } from '@angular/router';
import { CreateQuoteComponent } from './create-quote/create-quote.component';
import { DeleteQuoteComponent } from './delete-quote/delete-quote.component';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { DisplayQuoteComponent } from './display-quote/display-quote.component';
import { ListQuotesComponent } from './list-quotes/list-quotes.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path:'create', component: CreateQuoteComponent},
    {path:'delete/:id', component: DeleteQuoteComponent},
    {path:'edit/:id', component: EditQuoteComponent},
    {path:'display/:id', component: DisplayQuoteComponent},
    {path:'list-quotes', component: ListQuotesComponent},
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent}
];
