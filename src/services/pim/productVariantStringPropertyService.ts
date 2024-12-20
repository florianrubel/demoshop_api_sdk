import type {
    CreateProductVariantStringProperty,
    PatchProductVariantStringProperty,
    ProductVariantStringPropertySearchParameters,
    ViewProductVariantStringProperty,
} from '~api/interfaces/pim/productVariantStringProperty';
import AbstractWithDeleteService from '~api/services/abstractWithDeleteService';

export default class ProductVariantStringPropertyService extends AbstractWithDeleteService<
    ViewProductVariantStringProperty,
    CreateProductVariantStringProperty,
    PatchProductVariantStringProperty,
    ProductVariantStringPropertySearchParameters
> {
    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        super(
            'https://localhost:7210/product-variant-string-property',
            setUserFunction,
            resetUserFunction,
        );
    }
}
