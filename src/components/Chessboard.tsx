import * as React from "react";
import ChessCell from "./ChessCell";
import {Bishop, ChessPawn, King, Knight, Movement, Pawn, Queen, Tower} from "../chess/chessPawn";

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


interface ChessboardProps {

}

class Chessboard extends React.Component<ChessboardProps> {
    state = {
        board: Array(64).fill(undefined)
    }

    initBoard(board) {
        for (var i = 0; i < board.length; i++)
            board[i] = new ChessCellItem()
        board[0].pawn = new Tower(1)
        board[1].pawn = new Knight(1)
        board[2].pawn = new Bishop(1)
        board[3].pawn = new Queen(1)
        board[4].pawn = new King(1)
        board[5].pawn = new Bishop(1)
        board[6].pawn = new Knight(1)
        board[7].pawn = new Tower(1)
        for (var pin = 0; pin < 8; pin++) board[8 + pin].pawn = new Pawn(1)
        board[63].pawn = new Tower(0)
        board[62].pawn = new Knight(0)
        board[61].pawn = new Bishop(0)
        board[60].pawn = new Queen(0)
        board[59].pawn = new King(0)
        board[58].pawn = new Bishop(0)
        board[57].pawn = new Knight(0)
        board[56].pawn = new Tower(0)
        for (var pin = 0; pin < 8; pin++) board[55 - pin].pawn = new Pawn(0)
    }

    constructor(props) {
        super(props)
        this.focusPawn = this.focusPawn.bind(this)
        this.movePawn = this.movePawn.bind(this)
        this.eatPawn = this.eatPawn.bind(this)
        this.initBoard(this.state.board)
    }

    focusPawn(index: number) {
        const newBoard = [...this.state.board]
        newBoard.forEach(cell => cell.focus = cell.target = false)
        newBoard[index].focus = true
        this.showAvailableMove(index, newBoard)
        this.setState({board: newBoard})
    }

    movePawn(to: number) {
        const newBoard = [...this.state.board]
        const from = newBoard.findIndex((cell: ChessCellItem) => cell.focus)
        newBoard[to].pawn = newBoard[from].pawn
        newBoard[from].pawn = undefined
        newBoard.forEach(cell => cell.focus = cell.target = false)
        this.setState({board: newBoard})
    }

    eatPawn(to: number) {
        const newBoard = [...this.state.board]
        const from = newBoard.findIndex((cell: ChessCellItem) => cell.focus)
        newBoard[to].pawn = newBoard[from].pawn
        newBoard[from].pawn = undefined
        newBoard.forEach(cell => cell.focus = cell.target = false)
        this.setState({board: newBoard})
    }

    checkMoveOrStop(move: Movement, origin: ChessCellItem, target: ChessCellItem): boolean {
        // cas 1: les cases sont libres
        if (!target.pawn && !move.onlyAttack)
            target.target = true
        // cas 2: les cases sont occupés par mes pions
        if (target.pawn && target.pawn.owner == origin.pawn.owner)
            return false
        // cas 3: les cases sont occupés par les pions ennemies
        if (target.pawn && target.pawn.owner != origin.pawn.owner && !move.onlyMove) {
            target.target = true
            return false
        }
        if (target.pawn && target.pawn.owner != origin.pawn.owner && move.onlyMove) {
            target.target = false
        }
        return true
    }

    showAvailableMove(focused: number, board: ChessCellItem[]) {
        const [line, column] = [Math.floor(focused / 8), focused % 8]
        const moves: Movement[] = board[focused].pawn.availableMovement()
        moves.forEach((move: Movement) => {
            let repeat = 0
            let [targetLine, targetColumn] = [line, column]
            do {
                targetLine -= move.y
                targetColumn -= move.x
                const targetIndex = targetLine * 8 + targetColumn
                if (targetLine >= 0 && targetLine < 8 && targetColumn >= 0 && targetColumn < 8) {
                    const target: ChessCellItem = board[targetIndex]
                    const origin: ChessCellItem = board[focused]
                    if (!this.checkMoveOrStop(move, origin, target)) break

                }
                repeat++
            } while (move.infinity && repeat < 8);
        })
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
                                               index={index} eatPawn={this.eatPawn} movePawn={this.movePawn} focusPawn={this.focusPawn}/>)
                        else
                            return (<ChessCell key={index} color={column == 0 ? "black" : "white"} cell={value}
                                               index={index} eatPawn={this.eatPawn} movePawn={this.movePawn} focusPawn={this.focusPawn}/>)
                    })
                }
            </div>
        )
    }
}

export default Chessboard