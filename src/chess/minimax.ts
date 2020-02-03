import {ChessCellItem, PossibleMoves} from "../components/Chessboard";
import {getAvailablesMove} from "./chessPawn";

export enum Difficulty{
    EASY,
    NORMAL,
    HARD
}

const minmaxDifficulty = {
    [Difficulty.EASY]:1,
    [Difficulty.NORMAL]:2,
    [Difficulty.HARD]:3
}

function makeMove (board: ChessCellItem[], origin:number, move: PossibleMoves) : ChessCellItem[]{
    const newBoard = [...board]
    newBoard[move.to].pawn = newBoard[origin].pawn
    newBoard[origin].pawn = undefined
    return newBoard
}

export function minmax(board: ChessCellItem[], difficulty: Difficulty = Difficulty.EASY){
    const depths: number = minmaxDifficulty[difficulty]
    const blackPawns = board.map((cell, index) => {
        if(cell.pawn && !cell.pawn.isWhite)
            return {index, cell}
    }).filter(o => o)
    const pawnMoves = blackPawns.map(o => {
        return {pawn: o.cell.pawn, pos: o.index, moves: getAvailablesMove(o.index,board)}
    })
    const bestMove = {}
    let currentValue: number
    let highestSeenValue: number = 10000
    let lowestSeenValue: number = -10000
    pawnMoves.forEach(pawnAction => {
        pawnAction.moves.forEach(move => {
            const toBoard = makeMove(board, pawnAction.pos, move)


        })
    })
}