import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AbstractWithDeleteService from '~api/services/abstractWithDeleteService'; // Update the path
import AuthorizedApiClient from '~api/clients/authorizedApiClient';

vi.mock('~api/clients/authorizedApiClient');

type ViewType = { id: string; name: string };
type CreateType = { name: string };
type PatchType = Partial<{ name: string }>;
type SearchParametersType = { searchQuery?: string };

describe('AbstractWithDeleteService', () => {
    const mockBaseUrl = 'https://api.example.local';
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();

    let service: AbstractWithDeleteService<ViewType, CreateType, PatchType, SearchParametersType>;
    let mockClient: {
    delete: Mock;
  };

    beforeEach(() => {
    // Mock Axios client methods
        mockClient = {
            delete: vi.fn(),
        };
        (AuthorizedApiClient as unknown as Mock).mockImplementation(() => ({
            client: mockClient,
        }));

        // Instantiate the service
        service = new (class extends AbstractWithDeleteService<
      ViewType,
      CreateType,
      PatchType,
      SearchParametersType
    > {})(
            mockBaseUrl,
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should call the API to delete resources', async () => {
        const mockResponse: AxiosResponse<ViewType[]> = {
            data: [{ id: '1', name: 'Test' }],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };
        mockClient.delete.mockResolvedValueOnce(mockResponse);

        const deleteObjs: ViewType[] = [{ id: '1', name: 'Test' }];
        const result = await service.delete(deleteObjs);

        expect(mockClient.delete).toHaveBeenCalledWith('([object Object])');
        expect(result).toEqual(mockResponse);
    });
});
