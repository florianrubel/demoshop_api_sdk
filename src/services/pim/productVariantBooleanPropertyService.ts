import type {
    CreateProductVariantBooleanProperty,
    PatchProductVariantBooleanProperty,
    ProductVariantBooleanPropertyPaginationParameters,
    ViewProductVariantBooleanProperty,
} from '~api/interfaces/pim/productVariantBooleanProperty';
import AbstractWithDeleteService from '~api/services/abstractWithDeleteService';

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
