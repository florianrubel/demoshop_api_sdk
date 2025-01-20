import type { CreateProperty, ViewProperty } from '~api/interfaces/pim/properties/property';

export interface ViewNumericProperty extends ViewProperty {
    minValue: number | null;
    maxValue: number | null;
}

export interface CreateNumericProperty extends CreateProperty {
    minValue?: null;
    maxValue?: null;
}

export type PatchNumericProperty = Partial<CreateNumericProperty>;
