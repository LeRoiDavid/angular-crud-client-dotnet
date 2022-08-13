import { compileInjectable } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  seachForm: FormGroup;
  searchByCat: string = ''
  searchByDenom: string = ''
  produits: any[] = []
  produitObserver = new Subscription()
  produitToShow: any = null

  constructor(private produitService: ProduitService) {
    this.seachForm = new FormGroup({
      searchByCat: new FormControl(""),
      searchByDenom: new FormControl("")
    })
  }
  ngOnInit(): void {
    this.getProduits()
  }

  getProduits() {
    this.produitObserver = this.produitService.fetchAll(this.searchByDenom, this.searchByCat).subscribe({
      next: (data: any) => {
        this.produits = data.items
      },

      error: (err) => {

      }
    })
  }


  onDisplay(produit: any) {
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


  search() {
    this.searchByCat = this.seachForm.value.searchByCat
    this.searchByDenom = this.seachForm.value.searchByDenom
    console.log("this.searchByCat", this.searchByCat);
    console.log("this.searchByDenom", this.searchByDenom);
    this.getProduits()
  }

}
