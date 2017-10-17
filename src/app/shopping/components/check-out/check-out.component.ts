import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
// tslint:disable-next-line:one-line
export class CheckOutComponent implements OnInit{
  cart$: Observable<ShoppingCart>;
  constructor( private shoppingCartservice: ShoppingCartService) {  }

  // tslint:disable-next-line:use-life-cycle-interface
  async ngOnInit() {
    this.cart$ = await this.shoppingCartservice.getCart();
  }
}
