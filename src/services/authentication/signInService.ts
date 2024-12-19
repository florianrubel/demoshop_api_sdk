import { type AxiosResponse } from 'axios';

import type {
    AuthenticationTokenSet, SignInUser,
} from '~api/interfaces/authentication/signIn';

import UnauthorizedApiClient from '~api/clients/unauthorizedApiClient';

export default class SigninService {
    public unauthorizedApiClient: UnauthorizedApiClient;

    constructor() {
        this.unauthorizedApiClient = new UnauthorizedApiClient('https://localhost:7047/sign-in');
    }

    public async signIn(
        payload: SignInUser,
    ): Promise<AxiosResponse<AuthenticationTokenSet>> {
        return this.unauthorizedApiClient.client.post('', payload);
    }

    public async refreshAccessToken(
        payload: AuthenticationTokenSet,
    ): Promise<AxiosResponse<AuthenticationTokenSet>> {
        return this.unauthorizedApiClient.client.post('/refresh', payload);
    }
}
