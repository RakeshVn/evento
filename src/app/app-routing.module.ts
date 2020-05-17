import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { RegisterComponent } from './event/register/register.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: SigninComponent },
  { path: 'event/register', component: RegisterComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
