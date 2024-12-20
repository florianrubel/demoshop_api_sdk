import type { PaginationParameters, UuidViewModel } from '~api/interfaces/api';

export interface ViewProductVariantBooleanProperty extends UuidViewModel {
    productVariantId: string;
    propertyId: string;
    value: boolean;
}

export interface CreateProductVariantBooleanProperty {
    productVariantId: string;
    propertyId: string;
    value: boolean;
}

export interface PatchProductVariantBooleanProperty {
    value: boolean;
}

export interface ProductVariantBooleanPropertyPaginationParameters extends PaginationParameters {
    productVariantIds?: string;
    propertyIds?: string;
    value?: boolean;
}
