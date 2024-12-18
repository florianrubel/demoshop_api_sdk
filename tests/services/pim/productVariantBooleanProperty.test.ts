import { describe, it, expect, vi, beforeEach } from 'vitest';
import AbstractWithDeleteService from '~/services/abstractWithDeleteService';
import ProductVariantBooleanPropertyService from '~/services/pim/productVariantBooleanPropertyService';

vi.mock('~/services/abstractWithDeleteService');

describe('ProductVariantBooleanPropertyService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let service: ProductVariantBooleanPropertyService;

    beforeEach(() => {
        vi.resetAllMocks();

        // Initialize ProductVariantBooleanPropertyService
        service = new ProductVariantBooleanPropertyService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should initialize with the correct base URL and functions', () => {
        expect(AbstractWithDeleteService).toHaveBeenCalledWith(
            'https://localhost:7210/product-variant-boolean-property',
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should inherit methods from AbstractWithDeleteService', () => {
        expect(service).toBeInstanceOf(AbstractWithDeleteService);
    });
});
