import { ActionType } from '../shared/actionType.model';

export class Action {
    constructor(public id?: number,
                public type?: ActionType) {}
}
