import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = []

  theCategoryId: any;
  image = "/assets/image.jpg"
  
  
  constructor(private productService:ProductService ,private route:ActivatedRoute,private cartService:CartService) { }

  ///Angular Life cycle hook method which will be called by Angular automatically when 
  //the component( ProductListComponent) object is created.
  ngOnInit() {
    this.route.paramMap.subscribe(() => this.listProducts());
    
    
  }

  listProducts() {
    const searchMode = this.route.snapshot.paramMap.has('keyword')
    if (searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword:any = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProducts(theKeyword).subscribe((data) => {
      this.products = data;
    });
  }
  

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.theCategoryId = this.route.snapshot.paramMap.get('id');
    } else {
      this.theCategoryId = 1;
      
    }
    this.productService.getProductList(this.theCategoryId).subscribe((data) => {
         this.products = data;
      console.log(data);

      
    });

  }

  addToCart(theProduct: Product) {
    
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
