import {
    CreateProductVariant,
    PatchProductVariant,
    ProductVariantPaginationParameters,
    ViewProductVariant,
} from '~/interfaces/pim/productVariant';
import AbstractDefaultService from '~/services/abstractDefaultService';

export default class ProductVariantService extends AbstractDefaultService<
    ViewProductVariant,
    CreateProductVariant,
    PatchProductVariant,
    ProductVariantPaginationParameters
> {
    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        super(
            'https://localhost:7210/product-variant',
            setUserFunction,
            resetUserFunction,
        );
    }
}
