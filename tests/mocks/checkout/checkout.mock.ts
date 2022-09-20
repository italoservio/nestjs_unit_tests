import {CheckoutReqDTO} from '../../../src/checkout/dtos/req/checkout.dto';

export const checkoutMockedData = {
  products: [
    {
      name: 'Basketball shorts',
      price: 79.99,
    },
    {
      name: 'Jordan tennis',
      price: 849.99,
    },
  ],
  shipping: {
    region: 'SE',
    city: 'São Paulo',
    state: 'SP',
    zip: '15400111',
  },
} as CheckoutReqDTO;

export const MOCK_PRODUCTS_SUMMATION = 929.98;
export const NORTH_SHIPPING_VALUE = 24.11;
export const OTHERS_SHIPPING_VALUE = 15.31;
