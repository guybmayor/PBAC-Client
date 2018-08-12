export class ActionType {
    constructor(public name?: string,
                public roles?: Array<Role>) {}
}

export class Role {
    constructor(public name?: string,
                public input?: boolean) {}
}
