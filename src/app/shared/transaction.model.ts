import { ActingUser } from '../shared/actingUser.model';
import { Action } from '../shared/action.model';
import { ObjectData } from '../shared/request.model';

export class Transaction {
    constructor(public user?: ActingUser,
        public action?: Action,
        public inputObjects?: Array<ObjectData>,
        public outputObjects?: Array<ObjectData>) {}
}
