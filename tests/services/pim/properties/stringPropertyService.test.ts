import { describe, it, expect, vi, beforeEach } from 'vitest';
import AbstractDefaultService from '~api/services/abstractDefaultService';
import StringPropertyService from '~api/services/pim/properties/stringPropertyService';

vi.mock('~api/services/abstractDefaultService');

describe('StringPropertyService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let stringPropertyService: StringPropertyService;

    beforeEach(() => {
        vi.resetAllMocks();

        // Initialize StringPropertyService
        stringPropertyService = new StringPropertyService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should initialize with the correct base URL and functions', () => {
        expect(AbstractDefaultService).toHaveBeenCalledWith(
            'https://localhost:7210/properties/string-properties',
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should inherit methods from AbstractDefaultService', () => {
        expect(stringPropertyService).toBeInstanceOf(AbstractDefaultService);
    });
});
