import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import AuthorizedApiClient from '~api/clients/authorizedApiClient';
import { getCleanedQueryString } from '~api/helpers/misc';
import UserService from '~api/services/authentication/identity/userService';

vi.mock('~api/clients/authorizedApiClient');
vi.mock('~api/helpers/misc');

interface User {
  id: string;
  name: string;
}

describe('UserService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let userService: UserService;
    let mockAuthorizedApiClient: {
    client: {
      get: Mock;
    };
  };

    beforeEach(() => {
        vi.resetAllMocks();

        // Mock the AuthorizedApiClient
        mockAuthorizedApiClient = {
            client: {
                get: vi.fn(),
            },
        };
        (AuthorizedApiClient as unknown as Mock).mockImplementation(() => mockAuthorizedApiClient);

        userService = new UserService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should call the API to get multiple users with correct query parameters', async () => {
        const params = { searchQuery: 'test' };
        const mockResponse: AxiosResponse<User[]> = {
            data: [{ id: '1', name: 'John Doe' }],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };

        vi.mocked(getCleanedQueryString).mockReturnValueOnce('searchQuery=test');
        mockAuthorizedApiClient.client.get.mockResolvedValueOnce(mockResponse);

        const result = await userService.getMultiple(params);

        expect(getCleanedQueryString).toHaveBeenCalledWith(params);
        expect(mockAuthorizedApiClient.client.get).toHaveBeenCalledWith('?searchQuery=test', { signal: undefined });
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to get multiple users by IDs with correct query parameters', async () => {
        const ids = ['1', '2'];
        const params = { orderBy: 'name' };
        const mockResponse: AxiosResponse<User[]> = {
            data: [{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Doe' }],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };

        vi.mocked(getCleanedQueryString).mockReturnValueOnce('orderBy=name');
        mockAuthorizedApiClient.client.get.mockResolvedValueOnce(mockResponse);

        const result = await userService.getMultipleByIds(ids, params);

        expect(getCleanedQueryString).toHaveBeenCalledWith(params);
        expect(mockAuthorizedApiClient.client.get).toHaveBeenCalledWith('/(1,2)?orderBy=name', { signal: undefined });
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to get a single user by ID with correct query parameters', async () => {
        const id = '1';
        const params = { fields: 'name,email' };
        const mockResponse: AxiosResponse<User> = {
            data: { id: '1', name: 'John Doe' },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };

        vi.mocked(getCleanedQueryString).mockReturnValueOnce('fields=name,email');
        mockAuthorizedApiClient.client.get.mockResolvedValueOnce(mockResponse);

        const result = await userService.getOneOrDefault(id, params);

        expect(getCleanedQueryString).toHaveBeenCalledWith(params);
        expect(mockAuthorizedApiClient.client.get).toHaveBeenCalledWith('/1?fields=name,email', { signal: undefined });
        expect(result).toEqual(mockResponse);
    });
});
