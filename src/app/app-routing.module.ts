import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProduitComponent } from './create-produit/create-produit.component';
import { ProduitComponent } from './produit/produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';

const routes: Routes = [
  {
    path: '', component: ProduitComponent,

  },
  {
    path: 'create', component: CreateProduitComponent
  },
  {
    path: ':id', component: UpdateProduitComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
