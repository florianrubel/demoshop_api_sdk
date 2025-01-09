import type {
    CreateProductVariantNumericProperty,
    PatchProductVariantNumericProperty,
    ProductVariantNumericPropertyPaginationParameters,
    ViewProductVariantNumericProperty,
} from '~api/interfaces/pim/productVariantNumericProperty';
import AbstractWithDeleteService from '~api/services/abstractWithDeleteService';

export default class ProductVariantNumericPropertyService extends AbstractWithDeleteService<
    ViewProductVariantNumericProperty,
    CreateProductVariantNumericProperty,
    PatchProductVariantNumericProperty,
    ProductVariantNumericPropertyPaginationParameters
> {
    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        super(
            'https://localhost:7210/product-variant-numeric-properties',
            setUserFunction,
            resetUserFunction,
        );
    }
}
