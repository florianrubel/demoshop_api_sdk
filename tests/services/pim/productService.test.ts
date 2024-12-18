import { describe, it, expect, vi, beforeEach } from 'vitest';
import AbstractDefaultService from '~/services/abstractDefaultService';
import ProductService from '~/services/pim/productService';

vi.mock('~/services/abstractDefaultService');

describe('ProductService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let productService: ProductService;

    beforeEach(() => {
        vi.resetAllMocks();

        // Initialize ProductService
        productService = new ProductService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should initialize with the correct base URL and functions', () => {
        expect(AbstractDefaultService).toHaveBeenCalledWith(
            'https://localhost:7210/product',
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should inherit methods from AbstractDefaultService', () => {
        expect(productService).toBeInstanceOf(AbstractDefaultService);
    });
});
