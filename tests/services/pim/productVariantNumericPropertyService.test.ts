import { describe, it, expect, vi, beforeEach } from 'vitest';
import AbstractWithDeleteService from '~/services/abstractWithDeleteService';
import ProductVariantNumericPropertyService from '~/services/pim/productVariantNumericPropertyService';

vi.mock('~/services/abstractWithDeleteService');

describe('ProductVariantNumericPropertyService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let service: ProductVariantNumericPropertyService;

    beforeEach(() => {
        vi.resetAllMocks();

        // Initialize ProductVariantNumericPropertyService
        service = new ProductVariantNumericPropertyService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should initialize with the correct base URL and functions', () => {
        expect(AbstractWithDeleteService).toHaveBeenCalledWith(
            'https://localhost:7210/product-variant-numeric-property',
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should inherit methods from AbstractWithDeleteService', () => {
        expect(service).toBeInstanceOf(AbstractWithDeleteService);
    });
});
