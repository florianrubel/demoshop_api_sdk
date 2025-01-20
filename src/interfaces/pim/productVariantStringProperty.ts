import type { ViewProductVariantRelation, CreateProductVariantRelation, PatchProductVariantRelation, ProductVariantRelationSearchParameters } from '~api/interfaces/pim/productVariantRelation';

export type ViewProductVariantStringProperty = ViewProductVariantRelation<string>;

export type CreateProductVariantStringProperty = CreateProductVariantRelation<string>;

export type PatchProductVariantStringProperty = PatchProductVariantRelation<string>;

export type ProductVariantStringPropertySearchParameters = ProductVariantRelationSearchParameters<string>;
