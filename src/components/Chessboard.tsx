import * as React from "react";
import ChessCell from "./ChessCell";
import {
    Bishop,
    ChessPawn,
    getAvailablesMove,
    King,
    Knight,
    Movement,
    Owner,
    Pawn,
    Queen,
    Tower
} from "../chess/chessPawn";
import {minmax} from "../chess/minimax";

export class ChessCellItem {
    pawn?: ChessPawn
    focus?: boolean
    target?: boolean

    constructor(pawn?: ChessPawn) {
        this.pawn = pawn
        this.target = false
        this.focus = false
    }
}

export interface PossibleMoves{
    to: number
}


interface ChessboardProps {

}

class Chessboard extends React.Component<ChessboardProps> {
    state = {
        board: Array(64).fill(undefined),
        yourTurn: true
    }

    initBoard(board) {
        for (var i = 0; i < board.length; i++)
            board[i] = new ChessCellItem()
        board[0].pawn = new Tower(Owner.BLACK)
        board[1].pawn = new Knight(Owner.BLACK)
        board[2].pawn = new Bishop(Owner.BLACK)
        board[3].pawn = new Queen(Owner.BLACK)
        board[4].pawn = new King(Owner.BLACK)
        board[5].pawn = new Bishop(Owner.BLACK)
        board[6].pawn = new Knight(Owner.BLACK)
        board[7].pawn = new Tower(Owner.BLACK)
        for (var pin = 0; pin < 8; pin++) board[8 + pin].pawn = new Pawn(Owner.BLACK)
        board[63].pawn = new Tower(Owner.WHITE)
        board[62].pawn = new Knight(Owner.WHITE)
        board[61].pawn = new Bishop(Owner.WHITE)
        board[60].pawn = new Queen(Owner.WHITE)
        board[59].pawn = new King(Owner.WHITE)
        board[58].pawn = new Bishop(Owner.WHITE)
        board[57].pawn = new Knight(Owner.WHITE)
        board[56].pawn = new Tower(Owner.WHITE)
        for (var pin = 0; pin < 8; pin++) board[55 - pin].pawn = new Pawn(Owner.WHITE)
    }



    constructor(props) {
        super(props)
        this.toggleFocus = this.toggleFocus.bind(this)
        this.movePawn = this.movePawn.bind(this)
        this.eatPawn = this.eatPawn.bind(this)
        this.callIA = this.callIA.bind(this)
        this.initBoard(this.state.board)
    }

    toggleFocus(index: number) {
        if(this.state.board[index].pawn.isWhite == this.state.yourTurn ? 0 : 1) return
        const newBoard = [...this.state.board]
        const prevState = newBoard[index].focus
        newBoard.forEach(cell => cell.focus = cell.target = false)
        newBoard[index].focus = !prevState
        if(newBoard[index].focus) {
            const availableMoves = getAvailablesMove(index, newBoard)

            availableMoves.forEach(move => newBoard[move.to].target = true)
        }
        this.setState({board: newBoard})
    }

    movePawn(to: number) {
        const newBoard = [...this.state.board]
        const from = newBoard.findIndex((cell: ChessCellItem) => cell.focus)
        newBoard[to].pawn = newBoard[from].pawn
        newBoard[to].pawn.firstMoveDone = true
        newBoard[from].pawn = undefined
        newBoard.forEach(cell => cell.focus = cell.target = false)
        this.callIA()
        this.setState({board: newBoard, yourTurn: !this.state.yourTurn})
    }

    eatPawn(to: number) {
        const newBoard = [...this.state.board]
        const from = newBoard.findIndex((cell: ChessCellItem) => cell.focus)
        newBoard[to].pawn = newBoard[from].pawn
        newBoard[to].pawn.firstMoveDone = true
        newBoard[from].pawn = undefined
        newBoard.forEach(cell => cell.focus = cell.target = false)
        this.callIA()
        this.setState({board: newBoard, yourTurn: !this.state.yourTurn})
    }

    callIA(){
        minmax(this.state.board)
    }

    render() {
        return (
            <div className={"chessboard"}>
                {
                    this.state.board.map((value, index) => {
                        const row = Math.floor(index / 8) % 2
                        const column = index % 8 % 2
                        if (row == 0)
                            return (<ChessCell key={index} color={column == 0 ? "white" : "black"} cell={value}
                                               index={index} eatPawn={this.eatPawn} movePawn={this.movePawn}
                                               toggleFocus={this.toggleFocus}/>)
                        else
                            return (<ChessCell key={index} color={column == 0 ? "black" : "white"} cell={value}
                                               index={index} eatPawn={this.eatPawn} movePawn={this.movePawn}
                                               toggleFocus={this.toggleFocus}/>)
                    })
                }
            </div>
        )
    }
}

export default Chessboard