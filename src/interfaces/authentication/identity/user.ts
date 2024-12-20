import type { UuidViewModel } from '~api/interfaces/api';

export interface User extends UuidViewModel {
    id: string;
    userName: string;
    email: string;
    createdAt: string;
    updatedAt: string | null;
    lastLogin: string | null;
    emailConfirmed: boolean;
    lockoutEnd: string | null;
    lockoutEnabled: boolean;
    accessFailedCount: number;
    firstName: string | null;
    lastName: string | null;
}
