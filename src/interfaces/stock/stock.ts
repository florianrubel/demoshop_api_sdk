import { PaginationParameters, UuidViewModel } from '~/interfaces/api';

export interface ViewStockItem extends UuidViewModel {
    productVariantId: string;
    reservedAt: string | null;
    soldAt: string | null;
}

export interface StockItemPaginationParameters extends PaginationParameters {
    productVariantIds?: string;
    isAvailable?: boolean;
}

export interface CreateStockItem {
    productVariantId: string;
}

export interface PatchStockItem {
    // dummy class for dependency injection
}
