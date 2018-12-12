import { LogionGuard } from './logion.guard';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowuserComponent } from './showuser/showuser.component';
import { ShowleaveComponent } from './showleave/showleave.component';
import { ShowoutComponent } from './showout/showout.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule
} from '@angular/material';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { GetdataComponent } from './getdata/getdata.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowuserComponent,
    ShowleaveComponent,
    ShowoutComponent,
    LoginComponent,
    UserinfoComponent,
    GetdataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [LogionGuard, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
