// product.model.ts

import { CartItem } from './cart';

export class Product {
  id!: string;
  description!: string;
  price!: string;
  title!: string;
  slug!: string;
  brand!: string;
  priceroot!: number;
  sold!: number;
  quantity!: number;
  size!: string;
  images!: string;
  cartItems: CartItem[] = [];
  assess!: number;
  static images: any;
}
