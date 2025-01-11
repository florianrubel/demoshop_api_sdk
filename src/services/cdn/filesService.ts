import type { AxiosResponse } from 'axios';

import AuthorizedApiClient from '~api/clients/authorizedApiClient';

export default class FilesService {
    public authorizedApiClient: AuthorizedApiClient;

    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        this.authorizedApiClient = new AuthorizedApiClient('https://localhost:7168', setUserFunction, resetUserFunction);
    }

    public async listFiles(): Promise<AxiosResponse<string[]>> {
        return this.authorizedApiClient.client.get('/files');
    }
}
