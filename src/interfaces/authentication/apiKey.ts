import { UuidViewModel } from '~/interfaces/api';

export interface ViewApiKey extends UuidViewModel {
    key: string;
}

export interface CreateApiKey {
    roles: string[];
    scope: string;
}

export interface ApiKeyValidationRequest {
    apiKey: string;
}
