import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogionGuard } from './logion.guard';
import { ShowuserComponent } from './showuser/showuser.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'showuser',
    component: ShowuserComponent,
    canActivate: [LogionGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'showuser',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
