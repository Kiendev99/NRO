import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from 'src/app/shared/model/cart';
import { Product } from 'src/app/shared/model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any;
cart: any;
imgList: any;
  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        cartService.getCartItemById(params['id']).subscribe(data => {
          this.cartItems = data;
          this.imgList = Product.images;

        });
      }
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const local = localStorage.getItem("user");
    const user: any = local && JSON.parse(local);

    this.cartService.getCart(user?.cart).subscribe((items: any) => {
      console.log('Cart Items:', items);
      this.cartItems = items?.cart;
    });
  }

  changeQuantity(cartItem: CartItem, newQuantity: number): void {
    cartItem.quantity = newQuantity;
    this.updateCartItem(cartItem);
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.clearCart(cartItem.id).subscribe(() => {
      this.loadCartItems();
      console.log(cartItem);

    });
  }

  // getTotalItemsCount(): number {
  //   return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  // }

  getTotalPrice(): number {
    return this.cartItems.products.reduce((total: any, product: any) => {
      const productTotal = product.product.price * product.quantity;
      return total + productTotal;
    }, 0);
  }
  // getTotal(): number {\
  // return
  // }
  updateCartItem(cartItem: CartItem): void {
    this.cartService.updateCartItem(cartItem).subscribe(() => {
      this.loadCartItems();
    });
  }

  proceedToCheckout(): void {
    this.router.navigateByUrl('/checkout');
  }
}
