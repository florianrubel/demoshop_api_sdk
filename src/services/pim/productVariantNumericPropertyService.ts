import {
    CreateProductVariantNumericProperty,
    PatchProductVariantNumericProperty,
    ProductVariantNumericPropertyPaginationParameters,
    ViewProductVariantNumericProperty,
} from '~/interfaces/pim/productVariantNumericProperty';
import AbstractWithDeleteService from '~/services/abstractWithDeleteService';

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
            'https://localhost:7210/product-variant-numeric-property',
            setUserFunction,
            resetUserFunction,
        );
    }
}
