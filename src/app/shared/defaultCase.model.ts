export enum CaseAction {
    CREATE_USER, CREATE_REQUEST
}

export class CreateRequestObject {
    constructor(public userIndex?: number,
                public actionTypeIndex?: number,
                public objectsindexes?: number[]) {}
}

export class DefaultCase {
    public program: {action: CaseAction, data?: CreateRequestObject}[];
}
