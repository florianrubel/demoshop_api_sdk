import type { UuidViewModel } from '~api/interfaces/api';

export interface ViewStringProperty extends UuidViewModel {
    name: string;
    allowedValues: string[] | null;
}

export interface CreateStringProperty {
    name: string;
    allowedValues?: string[] | null;
}

export type PatchStringProperty = Partial<CreateStringProperty>;
