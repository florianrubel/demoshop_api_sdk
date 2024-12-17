import type { UuidViewModel } from "~/interfaces/api";

export interface ViewBooleanProperty extends UuidViewModel {
    name: string;
}

export interface CreateBooleanProperty {
    name: string;
}

export type PatchBooleanProperty = Partial<CreateBooleanProperty>;
