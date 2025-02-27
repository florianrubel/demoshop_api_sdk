import type { AxiosResponse, GenericAbortSignal } from 'axios';

import type { PaginationParameters } from '~api/interfaces/api';
import type { CreateApiKey, ViewApiKey } from '~api/interfaces/authentication/apiKey';

import { getCleanedQueryString } from '~api/helpers/misc';

import AuthorizedApiClient from '~api/clients/authorizedApiClient';

export default class ApiKeyService {
    private authorizedApiClient: AuthorizedApiClient;

    constructor(setUserFunction: CallableFunction, resetUserFunction: CallableFunction) {
        this.authorizedApiClient = new AuthorizedApiClient('https://localhost:7047/api-key', setUserFunction, resetUserFunction);
    }

    public async getMultiple(params: PaginationParameters, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<ViewApiKey[]>> {
        const query = getCleanedQueryString(params);
        return this.authorizedApiClient.client.get(`?${query}`, { signal: abortSignal });
    }

    public async create(payload?: CreateApiKey): Promise<AxiosResponse<ViewApiKey[]>> {
        return this.authorizedApiClient.client.post('', payload);
    }
}
