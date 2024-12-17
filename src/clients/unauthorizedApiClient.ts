import axios, { type AxiosInstance } from 'axios';

export default class UnauthorizedApiClient {
    private baseURL: string;
    public client: AxiosInstance;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
