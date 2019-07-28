export interface Movement {
    x?: number,
    y?: number,
    onlyAttack?: boolean,
    onlyMove?: boolean,
    infinity?: boolean
}

export interface ChessPawn {
    owner: number
    canJump: boolean
    icon: string

    availableMovement(): Movement[]
}


export class Pawn implements ChessPawn {
    owner: number;
    canJump: boolean = false;
    icon: string;

    constructor(owner: number){
        this.owner = owner
        this.icon = owner == 0 ? "&#9817;" : "&#9823;"
    }

    availableMovement(): Movement[] {
        return [
            {x: 0, y: this.owner == 0 ? 1 : -1, onlyMove: true},
            {x: 1, y: this.owner == 0 ? 1 : -1, onlyAttack: true},
            {x: -1, y: this.owner == 0 ? 1 : -1, onlyAttack: true}
        ];
    }
}

export class Tower implements ChessPawn {
    owner: number;
    canJump: boolean = false;
    icon: string;

    constructor(owner: number){
        this.owner = owner
        this.icon = owner == 0 ? "&#9814;" : "&#9820;"
    }

    availableMovement(): Movement[] {
        return [
            {x: 1, y: 0, infinity: true},
            {x: 0, y: 1, infinity: true},
            {x: -1, y: 0, infinity: true},
            {x: 0, y: -1, infinity: true}
        ]
    }
}

export class Knight implements ChessPawn {
    owner: number
    canJump: boolean = true
    icon: string;

    constructor(owner: number){
        this.owner = owner
        this.icon = owner == 0 ? "&#9816;" : "&#9822;"
    }

    availableMovement(): Movement[] {
        return [
            {x: -2, y: 1},
            {x: -1, y: 2},
            {x: 1, y: 2},
            {x: 2, y: 1},
            {x: 2, y: -1},
            {x: 1, y: -2},
            {x: -1, y: -2},
            {x: -2, y: -1}
        ];
    }

}

export class Bishop implements ChessPawn {
    owner: number;
    canJump: boolean = false
    icon: string;

    constructor(owner: number){
        this.owner = owner
        this.icon = owner == 0 ? "&#9815;" : "&#9821;"
    }

    availableMovement(): Movement[] {
        return [
            {infinity: true, x: 1, y: 1},
            {infinity: true, x: -1, y: 1},
            {infinity: true, x: 1, y: -1},
            {infinity: true, x: -1, y: -1}
        ];
    }
}

export class King implements ChessPawn {
    owner: number;
    canJump: boolean = false
    icon: string;

    constructor(owner: number){
        this.owner = owner
        this.icon = owner == 0 ? "&#9813;" : "&#9819;"
    }

    availableMovement(): Movement[] {
        return [
            {x: 1, y: 1},
            {x: -1, y: -1},
            {x: -1, y: 1},
            {x: 1, y: -1},
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1}
        ];
    }
}

export class Queen implements ChessPawn {
    canJump: boolean = false
    owner: number;
    icon: string;

    constructor(owner: number){
        this.owner = owner
        this.icon = owner == 0 ? "&#9812;" : "&#9818;"
    }

    availableMovement(): Movement[] {
        return [
            {infinity: true, x: 1, y: 1},
            {infinity: true, x: -1, y: -1},
            {infinity: true, x: -1, y: 1},
            {infinity: true, x: 1, y: -1},
            {infinity: true, x: 1, y: 0},
            {infinity: true, x: -1, y: 0},
            {infinity: true, x: 0, y: 1},
            {infinity: true, x: 0, y: -1}
        ];
    }

}
