import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
   }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
        .map(x => new ShoppingCart(x.items));
  }

  async removeFromCart(product: Product) {
     this.updateItem(product, -1);
   }

   async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCartItems(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    // tslint:disable-next-line:prefer-const
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      // tslint:disable-next-line:prefer-const
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  private async updateItem(product: Product, change: Number) {
     // tslint:disable-next-line:prefer-const
     let cartId = await this.getOrCreateCartId();
     // tslint:disable-next-line:prefer-const
     let item$ = this.getCartItems(cartId, product.$key);
     item$.take(1).subscribe(item => {
       let quantity = (item.quantity || 0) + change;
       if (quantity === 0 )item$.remove();
       else item$.update({
         title: product.title,
         price: product.price,
         imageUrl: product.imageUrl,
         quantity: quantity
        });
     });
  }

}
