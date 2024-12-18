import { SearchParameters } from '~/interfaces/api';
import { CreateBooleanProperty, PatchBooleanProperty, ViewBooleanProperty } from '~/interfaces/pim/properties/booleanProperty';
import AbstractDefaultService from '~/services/abstractDefaultService';

export default class BooleanPropertyService extends AbstractDefaultService<
    ViewBooleanProperty,
    CreateBooleanProperty,
    PatchBooleanProperty,
    SearchParameters
> {
    constructor(
        setUserFunction: CallableFunction,
        resetUserFunction: CallableFunction,
    ) {
        super(
            'https://localhost:7210/properties/boolean-properties',
            setUserFunction,
            resetUserFunction,
        );
    }
}
