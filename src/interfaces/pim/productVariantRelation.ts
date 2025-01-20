import type { PaginationParameters, SearchParameters, UuidViewModel } from '~api/interfaces/api';

export interface ViewProductVariantRelation<T> extends UuidViewModel {
    productVariantId: string;
    propertyId: string;
    value: T
}

export interface CreateProductVariantRelation<T> {
    productVariantId: string;
    propertyId: string;
    value: T
}

export interface PatchProductVariantRelation<T> {
    value?: T
}

export interface ProductVariantRelationPaginationParameters<T> extends PaginationParameters {
    productVariantIds?: string;
    propertyIds?: string;
    value?: T;
}

export interface ProductVariantRelationSearchParameters<T> extends SearchParameters {
    productVariantIds?: string;
    propertyIds?: string;
    value?: T;
}
