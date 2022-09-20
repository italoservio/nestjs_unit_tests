import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CheckoutReqDTO} from '../dtos/req/checkout.dto';
import {ShippingService} from './shipping.service';

@Injectable()
export class CheckoutService {
  constructor(private shippingService: ShippingService) {}

  public async getTotalAmount(checkout: CheckoutReqDTO) {
    const productsSummation = checkout.products.reduce((prev, curr) => {
      const prevInCents = prev * 100;
      const currInCents = curr.price * 100;
      const amountInCents = prevInCents + currInCents;
      const amount = parseFloat((amountInCents / 100).toFixed(2));
      return amount;
    }, 0);

    if (!productsSummation) {
      throw new HttpException(
        'Products summation cannot equal to zero',
        HttpStatus.BAD_REQUEST,
      );
    }

    let valueWithShipping: number;
    try {
      valueWithShipping = await this.shippingService.addsShippingValue(
        productsSummation,
        checkout.shipping.region,
      );
    } catch (err) {
      throw new HttpException(
        'Failed to call internal service',
        HttpStatus.BAD_GATEWAY,
      );
    }

    return {
      totalAmount: valueWithShipping,
    };
  }
}
