import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CusineComponent } from './cusine/cusine.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const route:Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'cusine', component: CusineComponent },
  { path: 'restaurant/:cusineName', component: RestaurantComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(route) ],
  exports: [RouterModule]
})
export class AppRoutingModule{}