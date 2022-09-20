import {IProduct} from './product.interface';
import {IShipping} from './shipping.interface';

export interface ICheckout {
  products: IProduct[];
  shipping: IShipping;
}
