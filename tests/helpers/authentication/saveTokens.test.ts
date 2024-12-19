import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AuthenticationTokenSet } from '~api/interfaces/authentication/signIn';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~api/constants/tokens';
import { saveTokens } from '~api/helpers/authentication';

// Mock the localStorage
const mockSetItem = vi.fn();
global.localStorage = {
    setItem: mockSetItem,
} as unknown as Storage;

describe('saveTokens', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should save accessToken and refreshToken to localStorage', () => {
        const tokens: AuthenticationTokenSet = {
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken',
        };

        const result = saveTokens(tokens);

        expect(mockSetItem).toHaveBeenCalledWith(ACCESS_TOKEN, 'mockAccessToken');
        expect(mockSetItem).toHaveBeenCalledWith(REFRESH_TOKEN, 'mockRefreshToken');
        expect(result).toBe(true);
    });

    it('should save only accessToken if refreshToken is missing', () => {
        // @ts-expect-error
        const tokens: AuthenticationTokenSet = {
            accessToken: 'mockAccessToken',
        };

        const result = saveTokens(tokens);

        expect(mockSetItem).toHaveBeenCalledWith(ACCESS_TOKEN, 'mockAccessToken');
        expect(mockSetItem).not.toHaveBeenCalledWith(REFRESH_TOKEN, expect.anything());
        expect(result).toBe(true);
    });

    it('should save only refreshToken if accessToken is missing', () => {
        // @ts-expect-error
        const tokens: AuthenticationTokenSet = {
            refreshToken: 'mockRefreshToken',
        };

        const result = saveTokens(tokens);

        expect(mockSetItem).toHaveBeenCalledWith(REFRESH_TOKEN, 'mockRefreshToken');
        expect(mockSetItem).not.toHaveBeenCalledWith(ACCESS_TOKEN, expect.anything());
        expect(result).toBe(true);
    });

    it('should not call localStorage.setItem if both tokens are missing', () => {
        // @ts-expect-error
        const tokens: AuthenticationTokenSet = {};

        const result = saveTokens(tokens);

        expect(mockSetItem).not.toHaveBeenCalled();
        expect(result).toBe(true);
    });
});
