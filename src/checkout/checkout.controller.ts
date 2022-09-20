import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {CheckoutReqDTO} from './dtos/req/checkout.dto';
import {CheckoutService} from './services/checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Post('')
  public async checkout(
    @Body(new ValidationPipe({transform: true})) body: CheckoutReqDTO,
  ) {
    return this.checkoutService.getTotalAmount(body);
  }
}
