import { SearchParameters } from '~/interfaces/api';
import { CreateStringProperty, PatchStringProperty, ViewStringProperty } from '~/interfaces/pim/properties/stringProperty';
import AbstractDefaultService from '~/services/abstractDefaultService';

export default class StringPropertyService extends AbstractDefaultService<
    ViewStringProperty,
    CreateStringProperty,
    PatchStringProperty,
    SearchParameters
> {
    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        super(
            'https://localhost:7210/properties/string-properties',
            setUserFunction,
            resetUserFunction,
        );
    }
}
