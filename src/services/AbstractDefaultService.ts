import type { AxiosResponse, GenericAbortSignal } from 'axios';

import type { PatchOperation, ShapingParameters, ShapingWithOrderingParameters } from '~/interfaces/api';

import { PATCH_REPLACE } from '~/constants/api';

import { getCleanedQueryString } from '~/helpers/api';

import AuthorizedApiClient from '~/clients/authorizedApiClient';

export default abstract class AbstractDefaultService<
    ViewType,
    CreateType,
    PatchType,
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

    public async getMultiple(params: SearchParametersType, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<ViewType[]>> {
        const query = getCleanedQueryString(params);
        return this.authorizedApiClient.client.get(`?${query}`, { signal: abortSignal });
    }

    public async getMultipleByIds(ids: string[], params?: ShapingWithOrderingParameters, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<ViewType[]>> {
        const query = getCleanedQueryString(params);
        return this.authorizedApiClient.client.get(`/(${ids.join(',')})?${query}`, { signal: abortSignal });
    }

    public async getOneOrDefault(id: string, params?: ShapingParameters, abortSignal?: GenericAbortSignal): Promise<AxiosResponse<ViewType>> {
        const query = getCleanedQueryString(params);
        return this.authorizedApiClient.client.get(`/${id}?${query}`, { signal: abortSignal });
    }

    public async create(createObjs: CreateType[]): Promise<AxiosResponse<ViewType[]>> {
        return this.authorizedApiClient.client.post('', createObjs);
    }

    public async patch(patchObjs: Record<string, PatchType>): Promise<AxiosResponse<Record<string, ViewType>>> {
        const patches: Record<string, PatchOperation[]> = {};
        Object.keys(patchObjs).forEach((id) => {
            const patchObj = patchObjs[id];
            const keys: string[] = Object.keys(patchObj as Record<string, unknown>);
            const patchOperations: PatchOperation[] = keys.map((key: string): PatchOperation => {
                const value = patchObj[key as keyof PatchType] as never | null;
                return {
                    op: PATCH_REPLACE,
                    path: `/${key}`,
                    value,
                };
            });
            patches[id] = patchOperations;
        });
        return this.authorizedApiClient.client.patch('', patches);
    }
}
