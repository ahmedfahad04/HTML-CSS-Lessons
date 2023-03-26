import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createProduct(products: any) {
    this.http.post<{name: string}>('https://angular-auth-58872-default-rtdb.firebaseio.com/products.json', products)
    .subscribe((res) => {console.log(res);});
  }
  
  fetchProducts(){
    return this.http.get<{[key: string]: Product}>('https://angular-auth-58872-default-rtdb.firebaseio.com/products.json')   // <> define the return type
    .pipe(map((res)  => {       //to convert data object using observable list(map) [transforming the response]
      const prod = []

      for (const key in res) {
        if (res.hasOwnProperty(key)) prod.push({...res[key], id:key});
      }

      return prod;
    }))
  }

  deleteProduct(id: string) {
    this.http.delete('https://angular-auth-58872-default-rtdb.firebaseio.com/products/' + id + '.json')     // return an observable, so we need to subscribe
    .subscribe((res) => {console.log(res);});
  }

  deleteAllProducts() {
    this.http.delete('https://angular-auth-58872-default-rtdb.firebaseio.com/products.json')     // return an observable, so we need to subscribe
    .subscribe((res) => {console.log(res);});
  }
}
