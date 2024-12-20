import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import AbstractDefaultService from '~api/services/abstractDefaultService';
import StockItemService from '~api/services/stock/stockItemService';

vi.mock('~api/services/abstractDefaultService');

describe('StockItemService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let service: StockItemService;
    let mockAuthorizedApiClient: {
    client: {
      post: Mock;
    };
  };

    beforeEach(() => {
        vi.resetAllMocks();

        // Mock AbstractDefaultService
        mockAuthorizedApiClient = {
            client: {
                post: vi.fn(),
            },
        };
        (AbstractDefaultService as unknown as Mock).mockImplementation(() => ({
            authorizedApiClient: mockAuthorizedApiClient,
        }));

        // Initialize StockItemService
        service = new StockItemService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should initialize with the correct base URL and functions', () => {
        expect(AbstractDefaultService).toHaveBeenCalledWith(
            'https://localhost:7273/stock/stock-item',
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should throw an error when calling patch', async () => {
        await expect(service.patch({})).rejects.toThrow('not implemented');
    });

    it('should call the API to reserve a stock item with the correct product variant ID', async () => {
        const productVariantId = 'productVariant123';
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await service.reserve(productVariantId);

        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith(`reserve/${productVariantId}`);
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to sell a stock item with the correct ID', async () => {
        const id = 'stockItem123';
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await service.sell(id);

        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith(`sell/${id}`);
        expect(result).toEqual(mockResponse);
    });
});
