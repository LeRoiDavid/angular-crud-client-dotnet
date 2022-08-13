import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: number | undefined

  formsErrors = new Map();
  validationsMessages = new Map()

  private contact = { denominationProduit: '', categorieProduit: '', quantiteProduit: 0, puProduit: 0, };

  constructor(
    private produitService: ProduitService,
    private router: Router,
    private activateRoute: ActivatedRoute
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
    this.activateRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = parseInt(params['id'], 10)
        this.getOneById()
      }
      console.log(this.id)
    });

  }



  getOneById() {
    this.produitSub = this.produitService.findById(Number(this.id)).subscribe({
      next: (success: any) => {
        this.isSaving = false
        console.log(success);
        this.produitForm.setValue({
          denominationProduit: success.denominationProduit,
          categorieProduit: success.categorieProduit,
          quantiteProduit: success.quantiteProduit,
          puProduit: success.puProduit,
        });
        // .denominationProduit.va = success.denominationProduit
      },
      error: rs => {
        this.isSaving = false
        this.router.navigateByUrl('/')
      }
    })

  }


  onUpdate() {
    this.isSaving = true
    this.contact = this.produitForm.value
    this.produitSub = this.produitService.update(Number(this.id), this.contact).subscribe({
      next: success => {
        alert("Mise a jour réussit");
        this.router.navigateByUrl("/");
        this.isSaving = false
      },
      error: rs => {
        this.isSaving = false

        alert("Echec de la creation")

      }
    })
  }

  ngOnDestroy(): void {
    if (this.produitSub) this.produitSub.unsubscribe()
  }

}
