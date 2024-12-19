import type { UuidViewModel } from '~api/interfaces/api';

export interface ViewNumericProperty extends UuidViewModel {
    name: string;
    minValue: number | null;
    maxValue: number | null;
}

export interface CreateNumericProperty {
    name: string;
    minValue?: null;
    maxValue?: null;
}

export type PatchNumericProperty = Partial<CreateNumericProperty>;
