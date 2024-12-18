import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import UnauthorizedApiClient from '~/clients/unauthorizedApiClient';
import SigninService from '~/services/authentication/signInService';
import { AuthenticationTokenSet, SignInUser } from '~/interfaces/authentication/signIn';

vi.mock('~/clients/unauthorizedApiClient');

describe('SigninService', () => {
    let signinService: SigninService;
    let mockUnauthorizedApiClient: {
    client: {
      post: Mock;
    };
  };

    beforeEach(() => {
        vi.resetAllMocks();

        // Mock UnauthorizedApiClient
        mockUnauthorizedApiClient = {
            client: {
                post: vi.fn(),
            },
        };
        (UnauthorizedApiClient as unknown as Mock).mockImplementation(() => mockUnauthorizedApiClient);

        // Initialize SigninService
        signinService = new SigninService();
    });

    it('should call the API to sign in with the correct payload', async () => {
        const payload: SignInUser = { userName: 'testuser', password: 'password123' };
        const mockResponse: AxiosResponse<AuthenticationTokenSet> = {
            data: {
                accessToken: 'mockAccessToken',
                refreshToken: 'mockRefreshToken',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };

        mockUnauthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await signinService.signIn(payload);

        expect(mockUnauthorizedApiClient.client.post).toHaveBeenCalledWith('', payload);
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to refresh access token with the correct payload', async () => {
        const payload: AuthenticationTokenSet = {
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken',
        };
        const mockResponse: AxiosResponse<AuthenticationTokenSet> = {
            data: {
                accessToken: 'newAccessToken',
                refreshToken: 'mockRefreshToken',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };

        mockUnauthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await signinService.refreshAccessToken(payload);

        expect(mockUnauthorizedApiClient.client.post).toHaveBeenCalledWith('/refresh', payload);
        expect(result).toEqual(mockResponse);
    });
});
