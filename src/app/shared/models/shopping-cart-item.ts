import { ShoppingCartComponent } from '../../shopping/components/shopping-cart/shopping-cart.component';
import { Product } from './product';

export class ShoppingCartItem {
    $key: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;

    constructor(init?: Partial <ShoppingCartItem>) {
        Object.assign(this, init);
    }

    get totalPrice() {
        return this.price * this.quantity;
    }

}