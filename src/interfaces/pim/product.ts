import type { UuidViewModel } from '~api/interfaces/api';

export interface ViewProduct extends UuidViewModel {
    name: string;
    description: Record<string, string>;
    defaultPriceInCents: number;
}

export interface CreateProduct {
    name: string;
    description: Record<string, string>;
    defaultPriceInCents: number;
}

export type PatchProduct = Partial<CreateProduct>;
