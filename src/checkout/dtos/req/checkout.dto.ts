import {Type} from 'class-transformer';
import {ArrayNotEmpty, IsNotEmptyObject, ValidateNested} from 'class-validator';
import {ICheckout} from '../../abstractions/interfaces/checkout.interface';
import {IProduct} from '../../abstractions/interfaces/product.interface';
import {IShipping} from '../../abstractions/interfaces/shipping.interface';
import {ProductSubDTO} from './sub-dtos/product.dto';
import {ShippingSubDTO} from './sub-dtos/shipping.dto';

export class CheckoutReqDTO implements ICheckout {
  @ArrayNotEmpty()
  @ValidateNested({each: true})
  @Type(() => ProductSubDTO)
  products: IProduct[];

  @IsNotEmptyObject()
  @ValidateNested({each: true})
  @Type(() => ShippingSubDTO)
  shipping: IShipping;
}
