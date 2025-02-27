import type { SearchParameters } from '~api/interfaces/api';
import type { CreateProduct, PatchProduct, ViewProduct } from '~api/interfaces/pim/product';
import AbstractDefaultService from '~api/services/abstractDefaultService';

export default class ProductService extends AbstractDefaultService<
    ViewProduct,
    CreateProduct,
    PatchProduct,
    SearchParameters
> {
    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        super(
            'https://localhost:7210/products',
            setUserFunction,
            resetUserFunction,
        );
    }
}
