import {
    CreateProductVariantBooleanProperty,
    PatchProductVariantBooleanProperty,
    ProductVariantBooleanPropertyPaginationParameters,
    ViewProductVariantBooleanProperty,
} from '~/interfaces/pim/productVariantBooleanProperty';
import AbstractWithDeleteService from '~/services/abstractWithDeleteService';

export default class ProductVariantBooleanPropertyService extends AbstractWithDeleteService<
    ViewProductVariantBooleanProperty,
    CreateProductVariantBooleanProperty,
    PatchProductVariantBooleanProperty,
    ProductVariantBooleanPropertyPaginationParameters
> {
    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        super(
            'https://localhost:7210/product-variant-boolean-property',
            setUserFunction,
            resetUserFunction,
        );
    }
}
