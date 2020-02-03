import * as React from 'react'
import {ChessPawn} from "../chess/chessPawn";
import {ChessCellItem} from "./Chessboard";

interface ChessCellProps{
    color: string,
    cell: ChessCellItem,
    index?: number,
    toggleFocus: (index: number) => void
    movePawn: (to: number) => void
    eatPawn: (to: number) => void
}

class ChessCell extends React.Component<ChessCellProps>{
    constructor(props){
        super(props)
        this.clickCell = this.clickCell.bind(this)
    }

    clickCell(e : React.MouseEvent){
        const {cell} = this.props
        if(cell.pawn && !cell.target || cell.focus)
            this.props.toggleFocus(this.props.index)
        if(!cell.pawn && cell.target)
            this.props.movePawn(this.props.index)
        if(cell.pawn && cell.target)
            this.props.eatPawn(this.props.index)
    }

    render(){
        const {cell} = this.props
        let classes = `${this.props.color}`
        classes += cell.focus ? " focus" : ""
        classes += !cell.target ? "" : cell.pawn ? " target" : " move"
        return (
            <div className={`chessboard-cell ${classes}`}  onClick={this.clickCell}
                 dangerouslySetInnerHTML={{__html: cell.pawn ? cell.pawn.icon : ""}}>
            </div>
        )
    }
}

export default ChessCell