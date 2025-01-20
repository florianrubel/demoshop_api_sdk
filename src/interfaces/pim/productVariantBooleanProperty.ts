import type { CreateProductVariantRelation, PatchProductVariantRelation, ProductVariantRelationPaginationParameters, ViewProductVariantRelation } from '~api/interfaces/pim/productVariantRelation';

export type ViewProductVariantBooleanProperty = ViewProductVariantRelation<boolean>;

export type CreateProductVariantBooleanProperty = CreateProductVariantRelation<boolean>;

export type PatchProductVariantBooleanProperty = PatchProductVariantRelation<boolean>;

export type ProductVariantBooleanPropertyPaginationParameters = ProductVariantRelationPaginationParameters<boolean>;
