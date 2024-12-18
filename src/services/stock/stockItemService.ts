import { type AxiosResponse } from 'axios';
import {
    CreateStockItem,
    PatchStockItem,
    StockItemPaginationParameters,
    ViewStockItem,
} from '~/interfaces/stock/stock';
import AbstractDefaultService from '~/services/abstractDefaultService';

export default class StockItemService extends AbstractDefaultService<
    ViewStockItem,
    CreateStockItem,
    PatchStockItem,
    StockItemPaginationParameters
> {
    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        super(
            'https://localhost:7273/stock/stock-item',
            setUserFunction,
            resetUserFunction,
        );
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public async patch(patchObjs: Record<string, PatchStockItem>): Promise<AxiosResponse<Record<string, ViewStockItem>>> {
        throw new Error('not implemented');
    }

    public async reserve(productVariantId: string): Promise<AxiosResponse<ViewStockItem>> {
        return this.authorizedApiClient.client.post(`reserve/${productVariantId}`);
    }

    public async sell(id: string): Promise<AxiosResponse<ViewStockItem>> {
        return this.authorizedApiClient.client.post(`sell/${id}`);
    }
}
