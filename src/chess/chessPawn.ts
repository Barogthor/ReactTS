import {ChessCellItem, PossibleMoves} from "../components/Chessboard";

export enum Owner{
    BLACK,
    WHITE
}

export function checkMoveOrStop(move: Movement, aBoard: ChessCellItem[], from: number, to: number, availableMoves: PossibleMoves[]): boolean {
    const origin: ChessCellItem = aBoard[from]
    const target: ChessCellItem = aBoard[to]
    const pawnBeforeSuperJump = origin.pawn.isWhite ? aBoard[from-8] : aBoard[from+8]
    // console.log(target, pawnBeforeSuperJump);
    // cas 1: les cases sont libres
    if (!target.pawn && !move.onlyAttack && !move.firstMove) {
        availableMoves.push({to})
    }
    else if (!target.pawn && !move.onlyAttack && move.firstMove != origin.pawn.firstMoveDone && !pawnBeforeSuperJump.pawn) {
        availableMoves.push({to})
    }
    // cas 2: les cases sont occupés par mes pions
    else if (target.pawn && target.pawn.isWhite == origin.pawn.isWhite)
        return false
    // cas 3: les cases sont occupés par les pions ennemies
    else if (target.pawn && target.pawn.isWhite != origin.pawn.isWhite && !move.onlyMove) {
        availableMoves.push({to})
        return false
    }
    // if (target.pawn && target.pawn.isWhite != origin.pawn.isWhite && move.onlyMove) {
    //     target.target = false
    // }
    return true
}

export function getAvailablesMove(focused: number, board: ChessCellItem[]) : PossibleMoves[] {
    const [line, column] = [Math.floor(focused / 8), focused % 8]
    const moves: Movement[] = board[focused].pawn.availableMovement()
    const availableMoves: PossibleMoves[] = []
    moves.forEach((move: Movement) => {
        let repeat = 0
        let [targetLine, targetColumn] = [line, column]
        do {
            targetLine -= move.y
            targetColumn -= move.x
            const targetIndex = targetLine * 8 + targetColumn
            if (targetLine >= 0 && targetLine < 8 && targetColumn >= 0 && targetColumn < 8)
                if (!this.checkMoveOrStop(move, board, focused, targetIndex, availableMoves)) break


            repeat++
        } while (move.infinity && repeat < 8);
    })
    // availableMoves.forEach(move => console.log(board[focused].pawn.getPieceValue(move.to)))
    // console.log("availables moves", availableMoves);
    return availableMoves
}

export interface Movement {
    x?: number
    y?: number
    onlyAttack?: boolean
    onlyMove?: boolean
    infinity?: boolean
    firstMove?: boolean
}

export interface ChessPawn {
    isWhite: boolean
    icon: string
    firstMoveDone: boolean
    scoreValue: number

    availableMovement(): Movement[]

    getPieceValue(pos: number): number
}

export class Pawn implements ChessPawn {
    isWhite: boolean;
    icon: string;
    firstMoveDone: boolean
    scoreValue: number

    constructor(owner: Owner){
        this.isWhite = owner == Owner.WHITE
        this.icon = this.isWhite ?  "&#9817;" : "&#9823;"
        this.scoreValue = this.isWhite ? 10 : -10
    }

    availableMovement(): Movement[] {
        return [
            {x: 0, y: this.isWhite ? 1 : -1, onlyMove: true},
            {x: 0, y: this.isWhite ? 2 : -2, onlyMove: true, firstMove:true},
            {x: 1, y: this.isWhite ? 1 : -1, onlyAttack: true},
            {x: -1, y: this.isWhite ? 1 : -1, onlyAttack: true}
        ];
    }

    getPieceValue(pos: number): number {
        const score = Math.abs(this.scoreValue) + ( this.isWhite ? pawnEvalWhite[pos] : pawnEvalBlack[pos] )
        return this.isWhite ? score : -score
    }
}

export class Tower implements ChessPawn {
    isWhite: boolean;
    icon: string;
    firstMoveDone: boolean
    scoreValue: number

    constructor(owner: Owner){
        this.isWhite = owner == Owner.WHITE
        this.icon = this.isWhite ?  "&#9814;" : "&#9820;"
        this.scoreValue = this.isWhite ? 50 : -50
    }

    availableMovement(): Movement[] {
        return [
            {x: 1, y: 0, infinity: true},
            {x: 0, y: 1, infinity: true},
            {x: -1, y: 0, infinity: true},
            {x: 0, y: -1, infinity: true}
        ]
    }

    getPieceValue(pos: number): number {
        const score = Math.abs(this.scoreValue) + ( this.isWhite ? rookEvalWhite[pos] : rookEvalBlack[pos] )
        return this.isWhite ? score : -score
    }
}

export class Knight implements ChessPawn {
    isWhite: boolean
    icon: string;
    firstMoveDone: boolean
    scoreValue: number

    constructor(owner: Owner){
        this.isWhite = owner == Owner.WHITE
        this.icon = this.isWhite ? "&#9816;" : "&#9822;"
        this.scoreValue = this.isWhite ? 30 : -30
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

    getPieceValue(pos: number): number {
        const score = Math.abs(this.scoreValue) +  knightEval[pos]
        return this.isWhite ? score : -score
    }

}

export class Bishop implements ChessPawn {
    isWhite: boolean;
    icon: string;
    firstMoveDone: boolean
    scoreValue: number

    constructor(owner: Owner){
        this.isWhite = owner == Owner.WHITE
        this.icon = this.isWhite ?  "&#9815;" : "&#9821;"
        this.scoreValue = this.isWhite ? 30 : -30
    }


    availableMovement(): Movement[] {
        return [
            {infinity: true, x: 1, y: 1},
            {infinity: true, x: -1, y: 1},
            {infinity: true, x: 1, y: -1},
            {infinity: true, x: -1, y: -1}
        ];
    }

    getPieceValue(pos: number): number {
        const score = Math.abs(this.scoreValue) + ( this.isWhite ? bishopEvalWhite[pos] : bishopEvalBlack[pos] )
        return this.isWhite ? score : -score
    }
}

export class King implements ChessPawn {
    isWhite: boolean;
    icon: string;
    firstMoveDone: boolean
    scoreValue: number

    constructor(owner: Owner){
        this.isWhite = owner == Owner.WHITE
        this.icon = this.isWhite ? "&#9812;" : "&#9818;"
        this.scoreValue = this.isWhite ? 900 : -900
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


    getPieceValue(pos: number): number {
        const score = Math.abs(this.scoreValue) + ( this.isWhite ? kingEvalWhite[pos] : kingEvalBlack[pos] )
        return this.isWhite ? score : -score
    }
}

export class Queen implements ChessPawn {
    isWhite: boolean;
    icon: string;
    firstMoveDone: boolean
    scoreValue: number

    constructor(owner: Owner){
        this.isWhite = owner == Owner.WHITE
        this.icon = this.isWhite ? "&#9813;" : "&#9819;"
        this.scoreValue = this.isWhite ? 90: -90
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

    getPieceValue(pos: number): number {
        const score = Math.abs(this.scoreValue) + evalQueen[pos]
        return this.isWhite ? score : -score
    }

}


const pawnEvalWhite = [
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
    [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
    [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
    [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
    [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
    [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
].reduce( (a,b) => a.concat(b));


const pawnEvalBlack = pawnEvalWhite.reverse();


const knightEval = [
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
    [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
    [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
    [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
    [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
    [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
].reduce( (a,b) => a.concat(b));

const bishopEvalWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
].reduce( (a,b) => a.concat(b));

const bishopEvalBlack = bishopEvalWhite.reverse();

const rookEvalWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
].reduce( (a,b) => a.concat(b));

const rookEvalBlack = rookEvalWhite.reverse();

const evalQueen = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
].reduce( (a,b) => a.concat(b));

const kingEvalWhite = [
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
].reduce( (a,b) => a.concat(b));

const kingEvalBlack = kingEvalWhite.reverse();
