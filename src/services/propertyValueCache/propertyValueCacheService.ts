import type { AxiosResponse } from 'axios';

import AuthorizedApiClient from '~api/clients/authorizedApiClient';

export default class PropertyValueCacheService {
    public authorizedApiClient: AuthorizedApiClient;

    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        this.authorizedApiClient = new AuthorizedApiClient('https://localhost:7272/property-value-cache', setUserFunction, resetUserFunction);
    }

    public async buildCache(): Promise<AxiosResponse> {
        return this.authorizedApiClient.client.post('/build-cache');
    }
}
