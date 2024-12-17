import { type AxiosResponse } from 'axios';

import type {
    AuthenticationTokenSet, SignInUser,
} from '~/interfaces/authentication/signIn';

import UnauthorizedApiClient from '~/clients/unauthorizedApiClient';

const unauthorizedApiClient = new UnauthorizedApiClient('/signin');

export const signIn = async (
    payload: SignInUser,
): Promise<AxiosResponse<AuthenticationTokenSet>> => (
    unauthorizedApiClient.client.post('', payload)
);

export const refreshAccessToken = async (
    payload: AuthenticationTokenSet,
): Promise<AxiosResponse<AuthenticationTokenSet>> => (
    unauthorizedApiClient.client.post('/refresh', payload)
);
