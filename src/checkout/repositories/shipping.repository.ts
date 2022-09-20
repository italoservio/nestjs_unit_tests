import {Injectable} from '@nestjs/common';
import {TRegion} from '../abstractions/types/region.type';
import {TShippingValue} from '../abstractions/types/shipping-value.type';

@Injectable()
export class ShippingRepository {
  public async shippingValueByState(region: TRegion): Promise<TShippingValue> {
    let object: TShippingValue;

    if (region.startsWith('N')) {
      object = {
        shippingFee: 0.11,
        shippingAmount: 24.0,
        shippingAmountWithFee: 24.11,
      };
    } else {
      object = {
        shippingFee: 0.21,
        shippingAmount: 15.1,
        shippingAmountWithFee: 15.31,
      };
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(object);
      }, 100);
    });
  }
}
