import type { CreateProductVariantRelation, PatchProductVariantRelation, ProductVariantRelationPaginationParameters, ViewProductVariantRelation } from '~api/interfaces/pim/productVariantRelation';

export type ViewProductVariantNumericProperty = ViewProductVariantRelation<number>;

export type CreateProductVariantNumericProperty = CreateProductVariantRelation<number>;

export type PatchProductVariantNumericProperty = PatchProductVariantRelation<number>;

export type ProductVariantNumericPropertyPaginationParameters = ProductVariantRelationPaginationParameters<number>;
