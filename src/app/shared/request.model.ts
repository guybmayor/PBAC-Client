import { Role } from '../shared/actionType.model';

export class Request {
    constructor(public userId?: number,
                public actionTypeName?: string,
                public objects?: RequestObject[]) {}
}

export class RequestObject {
    constructor(public object?: ObjectData,
                public role?: Role) {}
}

export class ObjectData {
    constructor(public id?: number,
                public version?: number) {}
}
