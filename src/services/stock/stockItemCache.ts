import { AxiosResponse } from 'axios';
import {
    CreateStockItem,
    PatchStockItem,
    StockItemPaginationParameters,
    ViewStockItem,
} from '~/interfaces/stock/stock';
import AbstractDefaultService from '~/services/AbstractDefaultService';

export default class StockItemmService extends AbstractDefaultService<
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

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public async patch(_patchObjs: Record<string, PatchStockItem>)
        : Promise<AxiosResponse<Record<string, ViewStockItem>>> {
        throw new Error('not implemented');
    }

    public async reserve(productVariantId: string): Promise<AxiosResponse<ViewStockItem>> {
        return this.authorizedApiClient.client.post(`reserve/${productVariantId}`);
    }

    public async sell(id: string): Promise<AxiosResponse<ViewStockItem>> {
        return this.authorizedApiClient.client.post(`sell/${id}`);
    }
}
