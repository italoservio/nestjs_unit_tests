import {Module} from '@nestjs/common';
import {CheckoutController} from './checkout.controller';
import {ShippingRepository} from './repositories/shipping.repository';
import {CheckoutService} from './services/checkout.service';
import {ShippingService} from './services/shipping.service';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService, ShippingService, ShippingRepository],
})
export class CheckoutModule {}
