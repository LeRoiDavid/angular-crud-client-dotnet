import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProduitComponent } from './create-produit/create-produit.component';
import { ProduitComponent } from './produit/produit.component';

const routes: Routes = [
  {
    path: '', component: ProduitComponent,

  },
  {
    path: 'create', component: CreateProduitComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
