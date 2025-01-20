import type { AxiosResponse } from 'axios';

import AbstractDefaultService from '~api/services/abstractDefaultService';

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
    public async delete(deleteIds: string[]): Promise<AxiosResponse<ViewType[]>> {
        return this.authorizedApiClient.client.delete('', { data: deleteIds });
    }
}
