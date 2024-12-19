import { describe, it, expect, vi, beforeEach } from 'vitest';
import AbstractDefaultService from '~api/services/abstractDefaultService';
import ProductVariantService from '~api/services/pim/productVariantService';

vi.mock('~api/services/abstractDefaultService');

describe('ProductVariantService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let service: ProductVariantService;

    beforeEach(() => {
        vi.resetAllMocks();

        // Initialize ProductVariantService
        service = new ProductVariantService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should initialize with the correct base URL and functions', () => {
        expect(AbstractDefaultService).toHaveBeenCalledWith(
            'https://localhost:7210/product-variant',
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should inherit methods from AbstractDefaultService', () => {
        expect(service).toBeInstanceOf(AbstractDefaultService);
    });
});
