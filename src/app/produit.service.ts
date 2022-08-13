import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private BASE_URL = environment.BASE_URL
  constructor(private httpClient: HttpClient) {
  }


  public fetchAll(denom: string = '', cat: string = '') {
    let search = '';
    if (denom != '') {
      search = `?denom=${denom}`
    }

    if (cat != '') {
      if (search != '') {
        search = search + `&cat=${cat}`
        console.log("search", search);

      } else {
        search = `?cat=${cat}`
      }
    }
    console.log("denom", denom, 'cat', cat);

    return this.httpClient.get(this.BASE_URL + "/Produits/paginate" + search)
  }


  public findById(id: number) {
    return this.httpClient.get(this.BASE_URL + "/Produits/" + id)
  }

  public create(produit: any) {
    return this.httpClient.post(this.BASE_URL + "/Produits", produit)
  }

  public update(id: number, produit: any) {
    return this.httpClient.put(this.BASE_URL + "/Produits/" + id, produit)
  }


  public delete(id: number) {
    return this.httpClient.delete(this.BASE_URL + "/Produits/" + id)
  }



}
