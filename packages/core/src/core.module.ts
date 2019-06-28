import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
})
export class CoreModule { }
