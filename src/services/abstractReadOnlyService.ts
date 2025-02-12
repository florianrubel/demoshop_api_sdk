import type { AxiosResponse, GenericAbortSignal } from 'axios';

import type { ShapingParameters, ShapingWithOrderingParameters } from '~api/interfaces/api';

import { getCleanedQueryString } from '~api/helpers/misc';

import AuthorizedApiClient from '~api/clients/authorizedApiClient';

export default abstract class AbstractReadOnlyService<
    ViewType,
    SearchParametersType,
> {
    public authorizedApiClient: AuthorizedApiClient;

    constructor(
        baseURL: string,
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        this.authorizedApiClient = new AuthorizedApiClient(baseURL, setUserFunction, resetUserFunction);
    }

    public async getMultiple(params?: SearchParametersType, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<ViewType[]>> {
        const query = getCleanedQueryString(params);
        return this.authorizedApiClient.client.get(`?${query}`, { signal: abortSignal });
    }

    public async getMultipleByIds(ids: string[], params?: ShapingWithOrderingParameters, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<ViewType[]>> {
        const query = getCleanedQueryString(params);
        return this.authorizedApiClient.client.get(`/(${ids.join(',')})?${query}`, { signal: abortSignal });
    }

    public async getMultipleByIdsByPost(ids: string[], params?: ShapingWithOrderingParameters, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<ViewType[]>> {
        const query = getCleanedQueryString(params);
        return this.authorizedApiClient.client.post(`/ids?${query}`, ids, { signal: abortSignal });
    }

    public async getOneOrDefault(id: string, params?: ShapingParameters, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<ViewType>> {
        const query = getCleanedQueryString(params);
        return this.authorizedApiClient.client.get(`/${id}?${query}`, { signal: abortSignal });
    }
}
