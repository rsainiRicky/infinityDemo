import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AddIntefaceComponent } from './core/add-interface/add-interface.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewDomainComponent } from './core/view-domain/view-domain.component';
import { AddDomainViewComponent } from './layout/add-domain-view/add-domain-view.component';
import { DomainListViewComponent } from './layout/domain-list-view/domain-list-view.component';
import { ModalWindowComponent } from './core/modal-window/modal-window.component';


@NgModule({
  declarations: [
    AppComponent,
    AddIntefaceComponent,
    ViewDomainComponent,
    AddDomainViewComponent,
    DomainListViewComponent,
    ModalWindowComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
