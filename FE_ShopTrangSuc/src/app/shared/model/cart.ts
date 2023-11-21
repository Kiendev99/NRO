import { Product } from './product';

export class CartItem {
  id!: string;
  productID: string;
  quantity: number;
  size: string;
  price: string;
  total: number;
  product: any;

  constructor(id: string, product: Product, quantity: number, size: string, total: number) {
    this.id = id;
    this.productID = product?.id || '';
    this.quantity = product?.quantity || 0;
    this.size = product?.size || '';
    this.price = product?.price || '';
    this.total = total;
  }
}

