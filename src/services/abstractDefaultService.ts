import type { AxiosResponse } from 'axios';

import type { PatchOperation } from '~api/interfaces/api';

import { PATCH_REPLACE } from '~api/constants/api';
import AbstractReadOnlyService from '~api/services/abstractReadOnlyService';

export default abstract class AbstractDefaultService<
    ViewType,
    CreateType,
    PatchType,
    SearchParametersType,
> extends AbstractReadOnlyService<ViewType, SearchParametersType> {

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
