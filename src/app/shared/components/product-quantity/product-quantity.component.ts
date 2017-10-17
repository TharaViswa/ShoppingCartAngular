import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input ('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input ('shopping-cart')shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
   this.cartService.addToCart(product);
  }
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }


}
