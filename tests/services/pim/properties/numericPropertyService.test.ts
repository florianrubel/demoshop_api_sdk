import { describe, it, expect, vi, beforeEach } from 'vitest';
import NumericPropertyService from '~api/services/pim/properties/numericPropertyService';
import AbstractDefaultService from '~api/services/abstractDefaultService';

vi.mock('~api/services/abstractDefaultService');

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
