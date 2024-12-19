import type { AxiosResponse, GenericAbortSignal } from 'axios';

import type { SearchParameters, ShapingParameters, ShapingWithOrderingParameters } from '~api/interfaces/api';
import type { User } from '~api/interfaces/authentication/identity/user';

import { getCleanedQueryString } from '~api/helpers/misc';

import AuthorizedApiClient from '~api/clients/authorizedApiClient';

export default class UserService {
    private authorizedApiClient: AuthorizedApiClient;

    constructor(setUserFunction: CallableFunction, resetUserFunction: CallableFunction) {
        this.authorizedApiClient = new AuthorizedApiClient('https://localhost:7047/user', setUserFunction, resetUserFunction);
    }

    public async getMultiple(params: SearchParameters, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<User[]>> {
        const query = getCleanedQueryString(params);
        return this.authorizedApiClient.client.get(`?${query}`, { signal: abortSignal });
    }

    public async getMultipleByIds(ids: string[], params?: ShapingWithOrderingParameters, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<User[]>> {
        const query = getCleanedQueryString(params);
        return this.authorizedApiClient.client.get(`/(${ids.join(',')})?${query}`, { signal: abortSignal });
    }

    public async getOneOrDefault(id: string, params?: ShapingParameters, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<User>> {
        const query = getCleanedQueryString(params);
        return this.authorizedApiClient.client.get(`/${id}?${query}`, { signal: abortSignal });
    }
}
