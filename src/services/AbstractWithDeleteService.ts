import type { AxiosResponse } from 'axios';

import AbstractDefaultService from '~/services/AbstractDefaultService';

export default abstract class AbstractWithDeleteService<
    ViewType,
    CreateType,
    PatchType,
    SearchParametersType,
> extends AbstractDefaultService<
        ViewType,
        CreateType,
        PatchType,
        SearchParametersType
    > {
    public async delete(deleteObjs: ViewType[]): Promise<AxiosResponse<ViewType[]>> {
        return this.authorizedApiClient.client.delete(`(${deleteObjs})`);
    }
}
