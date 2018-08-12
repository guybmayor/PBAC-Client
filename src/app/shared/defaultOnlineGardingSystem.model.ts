import { ObjectData, Request, RequestObject } from '../shared/request.model';

import { CaseAction, CreateRequestObject, DefaultCase } from './defaultCase.model';


export class DefaultOnlineGardingSystem extends DefaultCase {
    constructor() {
        super();
        this.program = [];

        this.program.push({action: CaseAction.CREATE_USER});
        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            0, 1, []
        )});

        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            0, 5, [0]
        )});

        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            0, 0, [1]
        )});

        this.program.push({action: CaseAction.CREATE_USER});
        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            1, 2, [2]
        )});

        this.program.push({action: CaseAction.CREATE_USER});
        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            2, 2, [2]
        )});

        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            1, 3, [3]
        )});

        this.program.push({action: CaseAction.CREATE_USER});
        this.program.push({action: CaseAction.CREATE_USER});
        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            4, 4, [2]
        )});

        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            4, 6, [6, 5]
        )});
    }

}
