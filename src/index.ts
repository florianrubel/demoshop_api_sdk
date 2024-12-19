import StockItemService from '~api/services/stock/stockItemService';

var service = new StockItemService(
    () => {},
    () => {},
);

service.patch({});
