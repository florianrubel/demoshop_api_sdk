import type { UuidViewModel } from '~api/interfaces/api';

export interface ViewBooleanProperty extends UuidViewModel {
    name: string;
}

export interface CreateBooleanProperty {
    name: string;
}

export type PatchBooleanProperty = Partial<CreateBooleanProperty>;
