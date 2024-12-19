import type { AuthenticationTokenSet, TokenUser } from '~api/interfaces/authentication/signIn';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~api/constants/tokens';

export function saveTokens({
    accessToken,
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

export function deleteTokens() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
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
