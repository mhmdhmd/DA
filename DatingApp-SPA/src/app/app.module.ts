import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './services/auth.service';
import { AppConfigService, ConfigFactory } from './_shared/app-config.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule
   ],
   providers: [
       AuthService,
       AppConfigService,
       {
           provide: APP_INITIALIZER,
           useFactory: ConfigFactory,
           deps: [AppConfigService], multi: true
       }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
