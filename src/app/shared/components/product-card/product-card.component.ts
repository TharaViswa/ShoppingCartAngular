import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input ('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input ('show-actions') showActions = true;
  // tslint:disable-next-line:no-input-rename
  @Input ('shopping-cart')shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
   this.cartService.addToCart(product);
  }
}
