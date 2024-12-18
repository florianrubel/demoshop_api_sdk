import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { PATCH_REPLACE } from '~/constants/api';
import AuthorizedApiClient from '~/clients/authorizedApiClient';
import AbstractDefaultService from '~/services/abstractDefaultService'; // Update the path

vi.mock('~/clients/authorizedApiClient');
vi.mock('~/helpers/misc', () => ({
    getCleanedQueryString: vi.fn((_params) => 'mockedQueryString'),
}));

type ViewType = { id: string; name: string };
type CreateType = { name: string };
type PatchType = Partial<{ name: string }>;
type SearchParametersType = { searchQuery?: string };

describe('AbstractDefaultService', () => {
    const mockBaseUrl = 'https://api.example.local';
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();

    let service: AbstractDefaultService<ViewType, CreateType, PatchType, SearchParametersType>;
    let mockClient: {
        get: Mock;
        post: Mock;
        patch: Mock;
    };

    beforeEach(() => {
        // Mock AuthorizedApiClient methods
        mockClient = {
            get: vi.fn(),
            post: vi.fn(),
            patch: vi.fn(),
        };
        (AuthorizedApiClient as unknown as Mock).mockImplementation(() => ({
            client: mockClient,
        }));

        // Instantiate the service
        service = new (class extends AbstractDefaultService<
            ViewType,
            CreateType,
            PatchType,
            SearchParametersType
        > { })(
            mockBaseUrl,
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should call the API to get multiple resources', async () => {
        const mockResponse: AxiosResponse<ViewType[]> = {
            data: [{ id: '1', name: 'Test' }],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };
        mockClient.get.mockResolvedValueOnce(mockResponse);

        const params: SearchParametersType = { searchQuery: 'test' };
        const result = await service.getMultiple(params);

        expect(mockClient.get).toHaveBeenCalledWith('?mockedQueryString', { signal: undefined });
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to get multiple resources by IDs', async () => {
        const mockResponse: AxiosResponse<ViewType[]> = {
            data: [{ id: '1', name: 'Test' }],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };
        mockClient.get.mockResolvedValueOnce(mockResponse);

        const ids = ['1', '2'];
        const params = { orderBy: 'name' };
        const result = await service.getMultipleByIds(ids, params);

        expect(mockClient.get).toHaveBeenCalledWith('/(1,2)?mockedQueryString', { signal: undefined });
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to get one resource or default', async () => {
        const mockResponse: AxiosResponse<ViewType> = {
            data: { id: '1', name: 'Test' },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };
        mockClient.get.mockResolvedValueOnce(mockResponse);

        const id = '1';
        const params = { fields: 'name' };
        const result = await service.getOneOrDefault(id, params);

        expect(mockClient.get).toHaveBeenCalledWith('/1?mockedQueryString', { signal: undefined });
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to create resources', async () => {
        const mockResponse: AxiosResponse<ViewType[]> = {
            data: [{ id: '1', name: 'Test' }],
            status: 201,
            statusText: 'Created',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };
        mockClient.post.mockResolvedValueOnce(mockResponse);

        const createObjs: CreateType[] = [{ name: 'Test' }];
        const result = await service.create(createObjs);

        expect(mockClient.post).toHaveBeenCalledWith('', createObjs);
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to patch resources', async () => {
        const mockResponse: AxiosResponse<Record<string, ViewType>> = {
            data: { '1': { id: '1', name: 'Updated Test' } },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };
        mockClient.patch.mockResolvedValueOnce(mockResponse);

        const patchObjs: Record<string, PatchType> = { '1': { name: 'Updated Test' } };
        const result = await service.patch(patchObjs);

        expect(mockClient.patch).toHaveBeenCalledWith('', {
            '1': [
                { op: PATCH_REPLACE, path: '/name', value: 'Updated Test' },
            ],
        });
        expect(result).toEqual(mockResponse);
    });
});
