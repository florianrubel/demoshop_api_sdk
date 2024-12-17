/* eslint-disable newline-per-chained-call */
import type { AuthenticationTokenSet, TokenUser } from '~/interfaces/authentication/signIn';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants/tokens';

export function saveTokens({
    accessToken,
    // eslint-disable-next-line no-shadow
    refreshToken,
}: AuthenticationTokenSet): boolean {
    if (accessToken) {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
    }
    if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }
    return true;
}

export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
}

export function getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
}

export function getTokenUser(token: string): TokenUser {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
    }

    const payload = parts[1];
    // Decode base64 URL-encoded string
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decodedPayload;
}
