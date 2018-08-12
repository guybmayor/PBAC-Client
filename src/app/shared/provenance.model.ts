
import { ActingUser } from '../shared/actingUser.model';
import { Role } from '../shared/actionType.model';
import { Action } from '../shared/action.model';
import { ObjectData } from '../shared/request.model';

export class ControllDependency {
    constructor(public action?: Action,
                public user?: ActingUser) {}
}

export class UsedDependency {
    constructor(public action?: Action,
                public object?: ObjectData,
                public role?: Role) {}
}

export class GeneratedDependency {
    constructor(public object?: ObjectData,
                public action?: Action,
                public role?: Role) {}
}


export class Provenance {
    constructor(public controllDependency?: ControllDependency,
                public useDependencies?: Array<UsedDependency>,
                public generatedDependencies?: Array<GeneratedDependency>) {}
}
