import { describe, it, expect, vi, beforeEach } from 'vitest';
import { REFRESH_TOKEN } from '~api/constants/tokens';
import { getRefreshToken } from '~api/helpers/authentication';

// Mock the localStorage
const mockGetItem = vi.fn();
global.localStorage = {
    getItem: mockGetItem,
} as unknown as Storage;

describe('getRefreshToken', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return the refreshToken if it exists in localStorage', () => {
        const mockToken = 'mockRefreshToken';
        mockGetItem.mockReturnValueOnce(mockToken);

        const result = getRefreshToken();

        expect(mockGetItem).toHaveBeenCalledWith(REFRESH_TOKEN);
        expect(result).toBe(mockToken);
    });

    it('should return null if refreshToken does not exist in localStorage', () => {
        mockGetItem.mockReturnValueOnce(null);

        const result = getRefreshToken();

        expect(mockGetItem).toHaveBeenCalledWith(REFRESH_TOKEN);
        expect(result).toBeNull();
    });
});
