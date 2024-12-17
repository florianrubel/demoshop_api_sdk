import type { AxiosResponse } from 'axios';

import AbstractDefaultService from '~/services/AbstractDefaultService';

export default abstract class AbstractWithDeleteService<
    ViewType,
    CreateType,
    PatchType,
    SearchParametersType
> extends AbstractDefaultService<
    ViewType,
    CreateType,
    PatchType,
    SearchParametersType
> {
    constructor(
        baseURL: string,
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction
    ) {
        super(baseURL, setUserFunction, resetUserFunction)
    }

    public async delete(deleteObjs: ViewType[]): Promise<AxiosResponse<ViewType[]>> {
        return this.authorizedApiClient.client.delete(`(${deleteObjs})`);
    }
}
