import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitComponent } from './produit/produit.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateProduitComponent } from './create-produit/create-produit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateProduitComponent } from './update-produit/update-produit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    CreateProduitComponent,
    UpdateProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
