import { describe, it, expect, vi, beforeEach } from 'vitest';
import AbstractDefaultService from '~api/services/abstractDefaultService';
import ProductService from '~api/services/pim/productService';

vi.mock('~api/services/abstractDefaultService');

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
