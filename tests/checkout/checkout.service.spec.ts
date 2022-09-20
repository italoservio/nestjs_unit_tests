import {HttpException} from '@nestjs/common';
import {mock} from 'jest-mock-extended';
import {CheckoutReqDTO} from '../../src/checkout/dtos/req/checkout.dto';
import {CheckoutService} from '../../src/checkout/services/checkout.service';
import {ShippingService} from '../../src/checkout/services/shipping.service';
import {
  checkoutMockedData,
  MOCK_PRODUCTS_SUMMATION,
  NORTH_SHIPPING_VALUE,
  OTHERS_SHIPPING_VALUE,
} from '../mocks/checkout/checkout.mock';

describe('CheckoutService', () => {
  let checkoutService: CheckoutService;
  let shippingService: ShippingService;

  beforeEach(async () => {
    shippingService = mock<ShippingService>({
      addsShippingValue: jest
        .fn()
        .mockResolvedValue(MOCK_PRODUCTS_SUMMATION + OTHERS_SHIPPING_VALUE),
    });
    checkoutService = new CheckoutService(shippingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(checkoutService).toBeDefined();
  });

  it('should throw an error when products amount is equal to zero', async () => {
    // Arrange
    const mockedData = {...checkoutMockedData};
    mockedData.products = mockedData.products.map(el => ({...el, price: 0}));

    // Act
    try {
      await checkoutService.getTotalAmount(mockedData);
    } catch (err) {
      // Assert
      expect(err instanceof HttpException).toBeTruthy();
      expect(err.message).toBe('Products summation cannot equal to zero');
    }
  });

  it('should return the value with shipping', async () => {
    // Act
    const response = await checkoutService.getTotalAmount(checkoutMockedData);

    // Assert
    expect(response.totalAmount).toBeGreaterThan(MOCK_PRODUCTS_SUMMATION);
  });

  it('should return the correct value when region is in north', async () => {
    // Arrange
    shippingService.addsShippingValue = jest
      .fn()
      .mockResolvedValueOnce(MOCK_PRODUCTS_SUMMATION + NORTH_SHIPPING_VALUE);
    const mockedData = {
      ...checkoutMockedData,
      shipping: {...checkoutMockedData.shipping, region: 'NE'},
    } as CheckoutReqDTO;
    const productsWithShipping = parseFloat(
      (
        (MOCK_PRODUCTS_SUMMATION * 100 + NORTH_SHIPPING_VALUE * 100) /
        100
      ).toFixed(2),
    );

    // Act
    const response = await checkoutService.getTotalAmount(mockedData);

    // Assert
    expect(response.totalAmount).toBe(productsWithShipping);
  });

  it("should return the correct value when region isn't in north", async () => {
    // Arrange
    const productsWithShipping = parseFloat(
      (
        (MOCK_PRODUCTS_SUMMATION * 100 + OTHERS_SHIPPING_VALUE * 100) /
        100
      ).toFixed(2),
    );

    // Act
    const response = await checkoutService.getTotalAmount(checkoutMockedData);

    // Assert
    expect(response.totalAmount).toBe(productsWithShipping);
  });

  it('should throw an error when failed to add shipping value', async () => {
    // Arrange
    shippingService.addsShippingValue = jest
      .fn()
      .mockRejectedValueOnce(new Error());

    // Act
    try {
      await checkoutService.getTotalAmount(checkoutMockedData);
    } catch (err) {
      // Assert
      expect(err instanceof HttpException).toBeTruthy();
      expect(err.message).toBe('Failed to call internal service');
    }
  });
});
