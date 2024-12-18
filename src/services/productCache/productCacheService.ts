import type { AxiosResponse } from 'axios';

import AuthorizedApiClient from '~/clients/authorizedApiClient';

export default class ProductCacheService {
    public authorizedApiClient: AuthorizedApiClient;

    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        this.authorizedApiClient = new AuthorizedApiClient('https://localhost:7230/build-cache', setUserFunction, resetUserFunction);
    }

    public async buildCache(): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post('');
    }

    public async buildCacheByProducts(ids: string[]): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post('by-products', ids);
    }

    public async buildCacheByProductVariants(ids: string[]): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post('by-product-variants', ids);
    }

    public async buildCacheByBooleanProperty(id: string): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post(`by-boolean-property/${id}`);
    }

    public async buildCacheByBooleanProperties(ids: string[]): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post('by-boolean-properties', ids);
    }

    public async buildCacheByNumericProperty(id: string): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post(`by-numeric-property/${id}`);
    }

    public async buildCacheByNummericProperties(ids: string[]): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post('by-numeric-properties', ids);
    }

    public async buildCacheByStringProperty(id: string): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post(`by-string-property/${id}`);
    }

    public async buildCacheByStringProperties(ids: string[]): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post('by-string-properties', ids);
    }

    public async buildCacheByProductVariantBooleanProperty(id: string): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post(`by-product-variant-boolean-property/${id}`);
    }

    public async buildCacheByProductVariantBooleanProperties(ids: string[]): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post('by-product-variant-boolean-properties', ids);
    }

    public async buildCacheByProductVariantNumericProperty(id: string): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post(`by-product-variant-numeric-property/${id}`);
    }

    public async buildCacheByProductVariantNummericProperties(ids: string[]): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post('by-product-variant-numeric-properties', ids);
    }

    public async buildCacheByProductVariantStringProperty(id: string): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post(`by-product-variant-string-property/${id}`);
    }

    public async buildCacheByProductVariantStringProperties(ids: string[]): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post('by-product-variant-string-properties', ids);
    }
}
