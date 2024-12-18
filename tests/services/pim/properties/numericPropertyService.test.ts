import { describe, it, expect, vi, beforeEach } from 'vitest';
import NumericPropertyService from '~/services/pim/properties/numericPropertyService';
import AbstractDefaultService from '~/services/abstractDefaultService';

vi.mock('~/services/abstractDefaultService');

describe('NumericPropertyService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let numericPropertyService: NumericPropertyService;

    beforeEach(() => {
        vi.resetAllMocks();

        // Initialize NumericPropertyService
        numericPropertyService = new NumericPropertyService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should initialize with the correct base URL and functions', () => {
        expect(AbstractDefaultService).toHaveBeenCalledWith(
            'https://localhost:7210/properties/numeric-properties',
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should inherit methods from AbstractDefaultService', () => {
        expect(numericPropertyService).toBeInstanceOf(AbstractDefaultService);
    });
});
