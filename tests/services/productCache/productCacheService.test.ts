import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import AuthorizedApiClient from '~/clients/authorizedApiClient';
import ProductCacheService from '~/services/productCache/productCacheService';

vi.mock('~/clients/authorizedApiClient');

describe('ProductCacheService', () => {
    const mockSetUserFunction = vi.fn();
    const mockResetUserFunction = vi.fn();
    let service: ProductCacheService;
    let mockAuthorizedApiClient: {
    client: {
      post: Mock;
    };
  };

    beforeEach(() => {
        vi.resetAllMocks();

        // Mock the AuthorizedApiClient
        mockAuthorizedApiClient = {
            client: {
                post: vi.fn(),
            },
        };
        (AuthorizedApiClient as unknown as Mock).mockImplementation(() => mockAuthorizedApiClient);

        // Initialize ProductCacheService
        service = new ProductCacheService(mockSetUserFunction, mockResetUserFunction);
    });

    it('should initialize with the correct base URL and functions', () => {
        expect(AuthorizedApiClient).toHaveBeenCalledWith(
            'https://localhost:7230/build-cache',
            mockSetUserFunction,
            mockResetUserFunction,
        );
    });

    it('should call the API to build the entire cache', async () => {
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await service.buildCache();

        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith('');
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to build cache by products', async () => {
        const ids = ['1', '2', '3'];
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await service.buildCacheByProducts(ids);

        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith('by-products', ids);
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to build cache by product variants', async () => {
        const ids = ['1', '2', '3'];
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await service.buildCacheByProductVariants(ids);

        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith('by-product-variants', ids);
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to build cache by boolean property', async () => {
        const id = '1';
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await service.buildCacheByBooleanProperty(id);

        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith(`by-boolean-property/${id}`);
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to build cache by numeric property', async () => {
        const id = '1';
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await service.buildCacheByNumericProperty(id);

        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith(`by-numeric-property/${id}`);
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to build cache by string properties', async () => {
        const ids = ['1', '2', '3'];
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await service.buildCacheByStringProperties(ids);

        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith('by-string-properties', ids);
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to build cache by product variant numeric property', async () => {
        const id = '1';
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);

        const result = await service.buildCacheByProductVariantNumericProperty(id);

        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith(`by-product-variant-numeric-property/${id}`);
        expect(result).toEqual(mockResponse);
    });

    it('should call the API to build cache by boolean properties', async () => {
        const ids = ['1', '2', '3'];
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);
    
        const result = await service.buildCacheByBooleanProperties(ids);
    
        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith('by-boolean-properties', ids);
        expect(result).toEqual(mockResponse);
    });
    
    it('should call the API to build cache by numeric properties', async () => {
        const ids = ['1', '2', '3'];
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);
    
        const result = await service.buildCacheByNummericProperties(ids);
    
        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith('by-numeric-properties', ids);
        expect(result).toEqual(mockResponse);
    });
    
    it('should call the API to build cache by string property', async () => {
        const id = '1';
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);
    
        const result = await service.buildCacheByStringProperty(id);
    
        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith(`by-string-property/${id}`);
        expect(result).toEqual(mockResponse);
    });
    
    it('should call the API to build cache by product variant boolean property', async () => {
        const id = '1';
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);
    
        const result = await service.buildCacheByProductVariantBooleanProperty(id);
    
        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith(`by-product-variant-boolean-property/${id}`);
        expect(result).toEqual(mockResponse);
    });
    
    it('should call the API to build cache by product variant boolean properties', async () => {
        const ids = ['1', '2', '3'];
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);
    
        const result = await service.buildCacheByProductVariantBooleanProperties(ids);
    
        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith('by-product-variant-boolean-properties', ids);
        expect(result).toEqual(mockResponse);
    });
    
    it('should call the API to build cache by product variant numeric property', async () => {
        const id = '1';
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);
    
        const result = await service.buildCacheByProductVariantNumericProperty(id);
    
        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith(`by-product-variant-numeric-property/${id}`);
        expect(result).toEqual(mockResponse);
    });
    
    it('should call the API to build cache by product variant numeric properties', async () => {
        const ids = ['1', '2', '3'];
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);
    
        const result = await service.buildCacheByProductVariantNummericProperties(ids);
    
        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith('by-product-variant-numeric-properties', ids);
        expect(result).toEqual(mockResponse);
    });
    
    it('should call the API to build cache by product variant string property', async () => {
        const id = '1';
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);
    
        const result = await service.buildCacheByProductVariantStringProperty(id);
    
        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith(`by-product-variant-string-property/${id}`);
        expect(result).toEqual(mockResponse);
    });
    
    it('should call the API to build cache by product variant string properties', async () => {
        const ids = ['1', '2', '3'];
        const mockResponse = { data: {}, status: 200, statusText: 'OK', headers: {}, config: {} };
        mockAuthorizedApiClient.client.post.mockResolvedValueOnce(mockResponse);
    
        const result = await service.buildCacheByProductVariantStringProperties(ids);
    
        expect(mockAuthorizedApiClient.client.post).toHaveBeenCalledWith('by-product-variant-string-properties', ids);
        expect(result).toEqual(mockResponse);
    });
    
});
