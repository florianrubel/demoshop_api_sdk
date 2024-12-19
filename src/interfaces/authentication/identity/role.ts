import type { UuidViewModel } from '~api/interfaces/api';

export interface Role extends UuidViewModel {
    name: string;
}

export interface CreateRole {
    name: string;
}

export type PatchRole = Partial<CreateRole>;
