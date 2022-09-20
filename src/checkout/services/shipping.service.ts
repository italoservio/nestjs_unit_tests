import {Injectable} from '@nestjs/common';
import {TRegion} from '../abstractions/types/region.type';
import {ShippingRepository} from '../repositories/shipping.repository';

@Injectable()
export class ShippingService {
  constructor(private shippingRepository: ShippingRepository) {}

  public async addsShippingValue(
    value: number,
    region: TRegion,
  ): Promise<number> {
    const shipping = await this.shippingRepository.shippingValueByState(region);
    const shippingValueInCents = shipping.shippingAmountWithFee * 100;
    const valueInCents = value * 100;
    const valueWithShippingInCents = shippingValueInCents + valueInCents;
    const valueWithShipping = (valueWithShippingInCents / 100).toFixed(2);
    return parseFloat(valueWithShipping);
  }
}
