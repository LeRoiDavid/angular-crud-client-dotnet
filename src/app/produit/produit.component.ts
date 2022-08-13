import { compileInjectable } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produits: any[] = []
  produitObserver = new Subscription()
  produitToShow: any = null
  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.getProduits()
  }


  getProduits() {
    this.produitObserver = this.produitService.fetchAll().subscribe({
      next: (data: any) => {
        this.produits = data.items
        console.log('====================================');
        console.log("data", data);
        console.log('====================================');
      },

      error: (err) => {

      }
    })
  }


  onDisplay(produit: any) {
    console.log('====================================');
    console.log("produit", produit);
    console.log('====================================');
    this.produitToShow = produit
  }

  delete(produit: any) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.produitObserver = this.produitService.delete(produit.idProduit).subscribe({
        next: (data: any) => {
          this.getProduits()
          alert("Suppression réussit")
        },

        error: (err) => { }
      })
    }

  }

}
