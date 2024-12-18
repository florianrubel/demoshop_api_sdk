import { SearchParameters } from '~/interfaces/api';
import { CreateNumericProperty, PatchNumericProperty, ViewNumericProperty } from '~/interfaces/pim/properties/numericProperty';
import AbstractDefaultService from '~/services/abstractDefaultService';

export default class NumericPropertyService extends AbstractDefaultService<
    ViewNumericProperty,
    CreateNumericProperty,
    PatchNumericProperty,
    SearchParameters
> {
    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        super(
            'https://localhost:7210/properties/numeric-properties',
            setUserFunction,
            resetUserFunction,
        );
    }
}
