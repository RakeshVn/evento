import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { RegisterComponent } from './event/register/register.component';
import { ViewComponent } from './event/view/view.component';
import { AuthService } from './services/auth/auth.service';
import { DashboardComponent } from './events/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: SigninComponent },
  { path: 'event/register', component: RegisterComponent },
  { path: 'event/view', component: ViewComponent, canActivate: [AuthService] },
  { path: 'event/dashboard', component: DashboardComponent, canActivate: [AuthService] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
