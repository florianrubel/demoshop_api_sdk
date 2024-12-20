import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import axios, { type AxiosInstance, AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import UnauthorizedApiClient from '~api/clients/unauthorizedApiClient';
import { getAccessToken, getRefreshToken, saveTokens } from '~api/helpers/authentication';
import AuthorizedApiClient from '~api/clients/authorizedApiClient';

vi.mock('axios');
vi.mock('~api/clients/unauthorizedApiClient');
vi.mock('~api/helpers/authentication');

type AuthenticationTokenSet = {
  accessToken: string;
  refreshToken: string;
};

describe('AuthorizedApiClient', () => {
    const mockBaseUrl = 'https://api.example.com';
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    let authorizedApiClient: AuthorizedApiClient;
    let mockAxiosInstance: AxiosInstance;
    let mockUnauthorizedApiClient: { client: Mock };

    beforeEach(() => {
        vi.resetAllMocks();

        // Mock Axios instance
        mockAxiosInstance = {
            interceptors: {
                request: {
                    use: vi.fn(),
                },
                response: {
                    use: vi.fn(),
                },
            },
            request: vi.fn(),
        } as unknown as AxiosInstance;

        (axios.create as Mock).mockReturnValue(mockAxiosInstance);

        // Mock UnauthorizedApiClient
        mockUnauthorizedApiClient = { client: vi.fn() };
        (UnauthorizedApiClient as Mock).mockImplementation(() => mockUnauthorizedApiClient);

        // Initialize AuthorizedApiClient
        authorizedApiClient = new AuthorizedApiClient(
            mockBaseUrl,
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should initialize Axios client with the correct baseURL', () => {
        expect(axios.create).toHaveBeenCalledWith({
            baseURL: mockBaseUrl,
            headers: { 'Content-Type': 'application/json' },
        });
    });

    it('should add Authorization header if access token is available', async () => {
        const mockAccessToken = 'mockAccessToken';
        vi.mocked(getAccessToken).mockReturnValue(mockAccessToken);

        // @ts-expect-error
        const [requestInterceptor] = mockAxiosInstance.interceptors.request.use.mock.calls[0];
        const enrichedConfig = await requestInterceptor({
            headers: {},
        });

        expect(enrichedConfig.headers.Authorization).toBe(`Bearer ${mockAccessToken}`);
    });

    it('should not add Authorization header if access token is unavailable', async () => {
        vi.mocked(getAccessToken).mockReturnValue(null);

        // @ts-expect-error
        const [requestInterceptor] = mockAxiosInstance.interceptors.request.use.mock.calls[0];
        const enrichedConfig = await requestInterceptor({
            headers: {},
        });

        expect(enrichedConfig.headers.Authorization).toBeUndefined();
    });

    it('should handle request interceptor errors', async () => {
        // @ts-expect-error
        const [, requestInterceptorError] = mockAxiosInstance.interceptors.request.use.mock.calls[0];
        const mockError = new AxiosError('Request failed');

        const result = await requestInterceptorError(mockError).catch((error: Error) => error);
        expect(result).toBe(mockError);
    });

    it('should refresh token and retry the request on 401 response', async () => {
        const mockAccessToken = 'newAccessToken';
        const mockRefreshToken = 'mockRefreshToken';
        const mockResponse: AxiosResponse<AuthenticationTokenSet> = {
            data: { accessToken: mockAccessToken, refreshToken: mockRefreshToken },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };

        vi.mocked(getRefreshToken).mockReturnValue(mockRefreshToken);
        vi.mocked(getAccessToken).mockReturnValue('oldAccessToken');
        // @ts-expect-error
        vi.mocked(saveTokens).mockImplementation(() => {});

        mockUnauthorizedApiClient.client.mockResolvedValueOnce(mockResponse);
        // @ts-expect-error
        mockAxiosInstance.request.mockResolvedValueOnce({ data: 'Retry successful' });

        // @ts-expect-error
        const [, responseInterceptorError] = mockAxiosInstance.interceptors.response.use.mock.calls[0];
        // @ts-expect-error
        const mock401Error = {
            config: { _retry: false },
            response: { status: 401 },
        } as AxiosError;

        const result = await responseInterceptorError(mock401Error);
        expect(result.data).toBe('Retry successful');
        expect(saveTokens).toHaveBeenCalledWith(mockResponse.data);
        expect(mockSetUserFunction).toHaveBeenCalled();
    });

    // TODO: Fix this test later with service integration
    // it('should reject if refresh token is unavailable', async () => {
    //     vi.mocked(getRefreshToken).mockReturnValue(null);

    //     const [, responseInterceptorError] = mockAxiosInstance.interceptors.response.use.mock.calls[0];
    //     const mock401Error = {
    //         config: { _retry: false },
    //         response: { status: 401 },
    //     } as AxiosError;

    //     await expect(responseInterceptorError(mock401Error)).rejects.toThrow(
    //         '[refresh token] no refresh token found',
    //     );
    //     expect(mockResetUserFunction).toHaveBeenCalledWith(true);
    // });

    it('should reject refresh token on failure', async () => {
        const mockRefreshToken = 'mockRefreshToken';

        vi.mocked(getRefreshToken).mockReturnValue(mockRefreshToken);

        mockUnauthorizedApiClient.client.mockRejectedValueOnce(new Error('Refresh failed'));

        // @ts-expect-error
        const [, responseInterceptorError] = mockAxiosInstance.interceptors.response.use.mock.calls[0];
        // @ts-expect-error
        const mock401Error = {
            config: { _retry: false },
            response: { status: 401 },
        } as AxiosError;

        await expect(responseInterceptorError(mock401Error)).rejects.toThrow('Refresh failed');
        expect(mockResetUserFunction).toHaveBeenCalledWith(true);
    });
});
