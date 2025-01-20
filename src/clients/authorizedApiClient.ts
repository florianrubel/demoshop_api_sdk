import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosRequestHeaders,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';

import type { AuthenticationTokenSet } from '~api/interfaces/authentication/signIn';

import { getAccessToken, getRefreshToken, saveTokens } from '~api/helpers/authentication';
import UnauthorizedApiClient from '~api/clients/unauthorizedApiClient';
import SignInService from '~api/services/authentication/signInService';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig<unknown> {
    _retry?: boolean;
}

export default class AuthorizedApiClient {
    private baseURL: string;

    private setUserFunction: CallableFunction;

    private resetUserFunction: CallableFunction;

    private unauthorizedApiClient: UnauthorizedApiClient;

    public client: AxiosInstance;

    constructor(
        baseURL: string,
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        this.baseURL = baseURL;
        this.setUserFunction = setUserFunction;
        this.resetUserFunction = resetUserFunction;

        this.unauthorizedApiClient = new UnauthorizedApiClient(this.baseURL);

        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.client.interceptors.request.use((config: InternalAxiosRequestConfig<unknown>) => {
            const accessToken: string | null = getAccessToken();
            const enrichedConfig: InternalAxiosRequestConfig<unknown> = config;
            if (accessToken !== null) {
                if (!enrichedConfig.headers) enrichedConfig.headers = {} as AxiosRequestHeaders;
                enrichedConfig.headers.Authorization = `Bearer ${accessToken}`;
            }
            return enrichedConfig;
        }, (error: AxiosError) => Promise.reject(error));

        this.client.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                const originalRequest: ExtendedAxiosRequestConfig = error.config || {} as ExtendedAxiosRequestConfig;
                const isUnauthorized: boolean | undefined = error.response && error.response.status === 401;

                // eslint-disable-next-line no-underscore-dangle
                if ((isUnauthorized) && originalRequest._retry !== true) {
                    // eslint-disable-next-line no-underscore-dangle
                    originalRequest._retry = true;

                    return this.refreshToken()
                        .then(() => this.client.request(originalRequest))
                        .catch((refreshError: AxiosError) => Promise.reject(refreshError));
                }
                return Promise.reject(error);
            },
        );
    }

    private refreshToken(): Promise<AxiosResponse<AuthenticationTokenSet>> {
        return new Promise((resolve, reject) => {
            if (getRefreshToken() === null) {
                reject(new Error('[refresh token] no refresh token found'));
                return;
            }

            const signInService = new SignInService
            signInService.refreshAccessToken({
                accessToken: getAccessToken() as string,
                refreshToken: getRefreshToken() as string,
            })
                .then((response: AxiosResponse<AuthenticationTokenSet>) => {
                    saveTokens(response.data);
                    this.setUserFunction();
                    resolve(response);
                })
                .catch((error: AxiosError) => {
                    this.resetUserFunction(true);
                    reject(error);
                });
        });
    }
}
