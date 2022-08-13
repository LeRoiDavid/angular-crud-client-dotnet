import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {

  public produitForm: FormGroup;
  public isSaving: boolean = false;
  private produitSub: Subscription = new Subscription();

  formsErrors = new Map();
  validationsMessages = new Map()

  private contact = { denominationProduit: '', categorieProduit: '', quantiteProduit: 0, puProduit: 0, };

  constructor(
    private produitService: ProduitService,
    private router: Router,
  ) {

    this.produitForm = new FormGroup({
      denominationProduit: new FormControl("", [Validators.required, Validators.minLength(2)]),
      categorieProduit: new FormControl("", [Validators.required, Validators.minLength(2)]),

      quantiteProduit: new FormControl("", [Validators.required, Validators.minLength(2)]),
      puProduit: new FormControl("", [Validators.required, Validators.minLength(2)]),

    })

  }

  ngOnInit(): void {
    console.log("Contact : ", this.contact)
  }





  onCreate() {
    this.isSaving = true
    this.contact = this.produitForm.value


    this.produitSub = this.produitService.create(this.contact).subscribe({
      next: success => {


        this.router.navigateByUrl("/");
        this.isSaving = false
      },
      error: rs => {
        this.isSaving = false

        alert("Echec de la creation")

      }
    }
    )
  }

  ngOnDestroy(): void {
    if (this.produitSub) this.produitSub.unsubscribe()
  }

}
