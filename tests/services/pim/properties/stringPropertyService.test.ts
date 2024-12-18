import { describe, it, expect, vi, beforeEach } from 'vitest';
import AbstractDefaultService from '~/services/abstractDefaultService';
import StringPropertyService from '~/services/pim/properties/stringPropertyService';

vi.mock('~/services/abstractDefaultService');

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
