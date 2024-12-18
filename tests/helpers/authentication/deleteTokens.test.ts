import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants/tokens';
import { deleteTokens } from '~/helpers/authentication';

// Mock the localStorage
const mockRemoveItem = vi.fn();
global.localStorage = {
    removeItem: mockRemoveItem,
} as unknown as Storage;

describe('deleteTokens', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should remove accessToken and refreshToken from localStorage', () => {
        deleteTokens();

        expect(mockRemoveItem).toHaveBeenCalledWith(ACCESS_TOKEN);
        expect(mockRemoveItem).toHaveBeenCalledWith(REFRESH_TOKEN);
    });

    it('should not throw an error if tokens do not exist in localStorage', () => {
        mockRemoveItem.mockImplementation(() => {
            // Simulate no-op for missing items
        });

        expect(() => deleteTokens()).not.toThrow();
        expect(mockRemoveItem).toHaveBeenCalledWith(ACCESS_TOKEN);
        expect(mockRemoveItem).toHaveBeenCalledWith(REFRESH_TOKEN);
    });
});
