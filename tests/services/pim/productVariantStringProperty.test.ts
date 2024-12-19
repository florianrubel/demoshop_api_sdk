import { describe, it, expect, vi, beforeEach } from 'vitest';
import AbstractWithDeleteService from '~api/services/abstractWithDeleteService';
import ProductVariantStringPropertyService from '~api/services/pim/productVariantStringPropertyService';

vi.mock('~api/services/abstractWithDeleteService');

describe('ProductVariantStringPropertyService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let service: ProductVariantStringPropertyService;

    beforeEach(() => {
        vi.resetAllMocks();

        // Initialize ProductVariantStringPropertyService
        service = new ProductVariantStringPropertyService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should initialize with the correct base URL and functions', () => {
        expect(AbstractWithDeleteService).toHaveBeenCalledWith(
            'https://localhost:7210/product-variant-string-property',
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should inherit methods from AbstractWithDeleteService', () => {
        expect(service).toBeInstanceOf(AbstractWithDeleteService);
    });
});
