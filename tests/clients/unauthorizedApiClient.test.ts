import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import axios, { type AxiosInstance } from 'axios';
import UnauthorizedApiClient from '~api/clients/unauthorizedApiClient'; // Update the import path

vi.mock('axios');

describe('UnauthorizedApiClient', () => {
    const mockBaseUrl = 'https://api.example.local';
    let mockAxiosInstance: AxiosInstance;
    let unauthorizedApiClient: UnauthorizedApiClient;

    beforeEach(() => {
        vi.resetAllMocks();

        // Mock Axios instance
        mockAxiosInstance = {
            interceptors: {
                request: { use: vi.fn() },
                response: { use: vi.fn() },
            },
            request: vi.fn(),
        } as unknown as AxiosInstance;

        // Mock axios.create to return the mocked Axios instance
        (axios.create as Mock).mockReturnValue(mockAxiosInstance);

        // Initialize UnauthorizedApiClient
        unauthorizedApiClient = new UnauthorizedApiClient(mockBaseUrl);
    });

    it('should initialize Axios client with the correct baseURL', () => {
        expect(axios.create).toHaveBeenCalledWith({
            baseURL: mockBaseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    it('should expose the Axios client', () => {
        expect(unauthorizedApiClient.client).toBe(mockAxiosInstance);
    });
});
