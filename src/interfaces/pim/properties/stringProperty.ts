import type { CreateProperty, ViewProperty } from '~api/interfaces/pim/properties/property';

export interface ViewStringProperty extends ViewProperty {
    allowedValues: string[];
}

export interface CreateStringProperty extends CreateProperty {
    allowedValues?: string[] | null;
}

export type PatchStringProperty = Partial<CreateStringProperty>;
