import { SearchParameters } from '~/interfaces/api';
import { CreateProduct, PatchProduct, ViewProduct } from '~/interfaces/pim/product';
import AbstractDefaultService from '~/services/abstractDefaultService';

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
            'https://localhost:7210/product',
            setUserFunction,
            resetUserFunction,
        );
    }
}
