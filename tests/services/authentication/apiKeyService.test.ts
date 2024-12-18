import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AuthorizedApiClient from '~/clients/authorizedApiClient';
import { getCleanedQueryString } from '~/helpers/misc';
import ApiKeyService from '~/services/authentication/apiKeyService';
import type { CreateApiKey, ViewApiKey } from '~/interfaces/authentication/apiKey';

vi.mock('~/clients/authorizedApiClient');
vi.mock('~/helpers/misc');

describe('ApiKeyService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let apiKeyService: ApiKeyService;
    let mockAuthorizedApiClient: {
    client: {
      get: Mock;
      post: Mock;
    };
  };

    beforeEach(() => {
        vi.resetAllMocks();

        // Mock the AuthorizedApiClient
        mockAuthorizedApiClient = {
            client: {
                get: vi.fn(),
                post: vi.fn(),
            },
        };
        (AuthorizedApiClient as unknown as Mock).mockImplementation(() => mockAuthorizedApiClient);

        apiKeyService = new ApiKeyService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should call the API to get multiple API keys with correct query parameters', async () => {
        const params = { page: 1, pageSize: 10 };
        const mockResponse: AxiosResponse<ViewApiKey[]> = {
            data: [
                { id: '1', key: 'abc123', createdAt: '-', updatedAt: '-' },
                { id: '2', key: 'def456', createdAt: '-', updatedAt: '-' },
            ],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };

        vi.mocked(getCleanedQueryString).mockReturnValueOnce('page=1&pageSize=10');
        mockAuthorizedApiClient.client.get.mockResolvedValueOnce(mockResponse);

        const result = await apiKeyService.getMultiple(params);

        expect(getCleanedQueryString).toHaveBeenCalledWith(params);
        expect(mockAuthorizedApiClient.client.get).toHaveBeenCalledWith('?page=1&pageSize=10', { signal: undefined });
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to create an API key with the correct payload', async () => {
        const payload: CreateApiKey = { roles: ['Admin'], scope: 'test' };
        const mockResponse: AxiosResponse<ViewApiKey[]> = {
            data: [
                { id: '1', key: 'abc123', createdAt: '-', updatedAt: '-' },
            ],
            status: 201,
            statusText: 'Created',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };

        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await apiKeyService.create(payload);

        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith('', payload);
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to create an API key without a payload', async () => {
        const mockResponse: AxiosResponse<ViewApiKey[]> = {
            data: [],
            status: 201,
            statusText: 'Created',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };

        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await apiKeyService.create();

        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith('', undefined);
        expect(result).toEqual(mockResponse);
    });
});
