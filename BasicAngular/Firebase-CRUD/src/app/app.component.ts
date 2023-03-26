import { Component, OnInit } from '@angular/core';
import { Product } from './model/products';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'AngularHttpRequest';
  allProducts: Product[] = [];
  isFetching: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // this.fetchProduct();  // whenever the page loads we want to fetch all data
  }

  onProductFetch() {
    this.fetchProduct();
  }

  // add data to firebase
  onProductCreate(products: { pname: string, desc: string, price: string }) {
    this.productService.createProduct(products);
  }
 
  // fetch data from firebase
  private fetchProduct() {
    this.isFetching = true;

    this.productService.fetchProducts()
    .subscribe((product) => {
      console.log('GET: ' + product);
      this.allProducts = product;
      this.isFetching = false;
    });
  }

  onDeleteProduct(id: string) {
    console.log('delete product id: ' + id)
    this.productService.deleteProduct(id);
  }

  onDeleteAllProducts() {
   this.productService.deleteAllProducts();
  }
}


