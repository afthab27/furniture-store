import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }
  
  getProductList(theCategoryId:number) {
    let searchUrl = 'http://localhost:8080/api/products/search/findByCategoryId?id='+theCategoryId;
    
    return this.http.get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategories() {
    let productCategoryUrl = 'http://localhost:8080/api/product-category';

    return this.http.get<GetResponseProductCategory>(productCategoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  //search
  searchProducts(theKeyword: string) {
    const searchUrl = 'http://localhost:8080/api/products/search/findByNameContaining?name=' + theKeyword;
    return this.http.get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  //get product details
  getProduct(theProductId: number) {
    const productUrl = 'http://localhost:8080/api/products/' + theProductId;
    return this.http.get<Product>(productUrl);
  }
}

//Unwraps the JSON data from Backend spring data rest _embedded entry
interface GetResponseProducts{
  _embedded: {
    products:Product[]
  }

}

interface GetResponseProductCategory{
  _embedded: {
    productCategory:ProductCategory[]
  }
}
