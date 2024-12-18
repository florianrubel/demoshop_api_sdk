import { describe, it, expect, vi, beforeEach } from 'vitest';
import AbstractDefaultService from '~/services/abstractDefaultService';
import BooleanPropertyService from '~/services/pim/properties/booleanPropertyService';

vi.mock('~/services/abstractDefaultService');

describe('BooleanPropertyService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let booleanPropertyService: BooleanPropertyService;

    beforeEach(() => {
        vi.resetAllMocks();

        // Initialize BooleanPropertyService
        booleanPropertyService = new BooleanPropertyService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should initialize with the correct base URL and functions', () => {
        expect(AbstractDefaultService).toHaveBeenCalledWith(
            'https://localhost:7210/properties/boolean-properties',
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should inherit methods from AbstractDefaultService', () => {
        expect(booleanPropertyService).toBeInstanceOf(AbstractDefaultService);
    });
});
