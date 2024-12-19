import { PaginationParameters, UuidViewModel } from '~api/interfaces/api';

export interface ViewProductVariantNumericProperty extends UuidViewModel {
    productVariantId: string;
    propertyId: string;
    value: number;
}

export interface CreateProductVariantNumericProperty {
    productVariantId: string;
    propertyId: string;
    value: number;
}

export interface PatchProductVariantNumericProperty {
    value: number;
}

export interface ProductVariantNumericPropertyPaginationParameters extends PaginationParameters {
    productVariantIds?: string;
    propertyIds?: string;
    value?: number;
}
