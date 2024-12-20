import type { SearchParameters, UuidViewModel } from '~api/interfaces/api';

export interface ViewProductVariantStringProperty extends UuidViewModel {
    productVariantId: string;
    propertyId: string;
    value: string;
}

export interface CreateProductVariantStringProperty {
    productVariantId: string;
    propertyId: string;
    value: string;
}

export interface PatchProductVariantStringProperty {
    value: string;
}

export interface ProductVariantStringPropertySearchParameters extends SearchParameters {
    productVariantIds?: string;
    propertyIds?: string;
    value?: string;
}
