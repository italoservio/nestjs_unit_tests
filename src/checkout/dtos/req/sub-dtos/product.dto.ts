import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {IProduct} from '../../../abstractions/interfaces/product.interface';

export class ProductSubDTO implements IProduct {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
