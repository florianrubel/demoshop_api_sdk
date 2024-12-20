import type { SearchParameters } from '~api/interfaces/api';
import type { CreateBooleanProperty, PatchBooleanProperty, ViewBooleanProperty } from '~api/interfaces/pim/properties/booleanProperty';
import AbstractDefaultService from '~api/services/abstractDefaultService';

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
