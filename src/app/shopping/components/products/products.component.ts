import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  products: Product[] = [];
  filteredProduct: Product[] = [];
  category: string;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
   ) {  }

  // tslint:disable-next-line:use-life-cycle-interface
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProduct();
  }

  private populateProduct() {
    this.productService.getAll().
    switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProduct = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
