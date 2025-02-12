import type { AxiosResponse, GenericAbortSignal } from 'axios';

import type { ProductSearchRequest, ProductSearchResult } from '~api/interfaces/productSearch/productSearch';

import UnauthorizedApiClient from '~api/clients/unauthorizedApiClient';

export default class ProductSearchService {
    public unauthorizedApiClient: UnauthorizedApiClient;

    constructor() {
        this.unauthorizedApiClient = new UnauthorizedApiClient('https://localhost:7186/product-search');
    }

    public async search(params: ProductSearchRequest, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<ProductSearchResult>> {
        return this.unauthorizedApiClient.client.post('', params, { signal: abortSignal });
    }
}
