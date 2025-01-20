import type { UuidViewModel } from '~api/interfaces/api';

export interface ViewProperty extends UuidViewModel {
    name: string;
}

export interface CreateProperty {
    name: string;
}

export type PatchProperty = Partial<CreateProperty>;
