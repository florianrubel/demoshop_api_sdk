import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ACCESS_TOKEN } from '~/constants/tokens';
import { getAccessToken } from '~/helpers/authentication';

// Mock the localStorage
const mockGetItem = vi.fn();
global.localStorage = {
    getItem: mockGetItem,
} as unknown as Storage;

describe('getAccessToken', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return the accessToken if it exists in localStorage', () => {
        const mockToken = 'mockAccessToken';
        mockGetItem.mockReturnValueOnce(mockToken);

        const result = getAccessToken();

        expect(mockGetItem).toHaveBeenCalledWith(ACCESS_TOKEN);
        expect(result).toBe(mockToken);
    });

    it('should return null if accessToken does not exist in localStorage', () => {
        mockGetItem.mockReturnValueOnce(null);

        const result = getAccessToken();

        expect(mockGetItem).toHaveBeenCalledWith(ACCESS_TOKEN);
        expect(result).toBeNull();
    });
});
