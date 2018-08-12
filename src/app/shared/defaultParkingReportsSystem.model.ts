import { ObjectData, Request, RequestObject } from '../shared/request.model';

import { CaseAction, CreateRequestObject, DefaultCase } from './defaultCase.model';

export class ParkingReportsSystem extends DefaultCase {
    constructor() {
        super();
        this.program = [];

        this.program.push({action: CaseAction.CREATE_USER});
        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            0, 2, []
        )});

        this.program.push({action: CaseAction.CREATE_USER});
        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            1, 4, [0]
        )});

        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            1, 5, [1]
        )});

        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            1, 5, [2]
        )});

        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            1, 0, [3]
        )});

        this.program.push({action: CaseAction.CREATE_USER});
        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            2, 3, [4]
        )});

        this.program.push({action: CaseAction.CREATE_USER});
        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            3, 3, [4]
        )});

        this.program.push({action: CaseAction.CREATE_REQUEST, data: new CreateRequestObject(
            2, 1, [4]
        )});
    }

}
