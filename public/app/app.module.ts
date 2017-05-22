import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { CoreModule }   from './core/core.module';
import { SharedModule }   from './shared/shared.module';

import { Observable } from 'rxjs/Observable';

@NgModule({
  imports: [
    BrowserModule, 
    CoreModule,   //Singleton objects
    SharedModule  //Shared (multi-instance) objects
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }