import type { PaginationParameters, UuidViewModel } from '~api/interfaces/api';

export interface ViewProductVariant extends UuidViewModel {
    priceInCents: number;
    productId: string;
    listPicture: string;
    pictures: string[];
}

export interface CreateProductVariant {
    priceInCents: number;
    productId: string;
    listPicture: string;
    pictures: string[];
}

export type PatchProductVariant = Partial<Omit<CreateProductVariant, 'productId'>>;

export interface ProductVariantPaginationParameters extends PaginationParameters {
    productIds?: string;
}
