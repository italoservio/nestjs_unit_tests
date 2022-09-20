import {IsNotEmpty, IsString, Length} from 'class-validator';
import {IShipping} from '../../../abstractions/interfaces/shipping.interface';
import {TRegion} from '../../../abstractions/types/region.type';

export class ShippingSubDTO implements IShipping {
  @IsNotEmpty()
  @IsString()
  region: TRegion;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(2)
  state: string;

  @IsNotEmpty()
  @IsString()
  zip: string;
}
