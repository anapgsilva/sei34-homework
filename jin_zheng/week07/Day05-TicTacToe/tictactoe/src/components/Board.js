import React, {Component} from 'react';
import Square from './Square.js'

class Board extends Component{

    renderSquare(i){
        return (
            < Square value= {this.props.squares[i]} onClick={()=> this.props.onClick(i)} />
        )
    }

    render(){
        let item = []
        for (let i = 0; i < 3; i++) {
            item.push(<div className='board-row' key={i}>
                {this.renderSquare(0+3*i)}
                {this.renderSquare(1+3*i)}
                {this.renderSquare(2+3*i)}
                </div>)
          }

        return(
            <>
            {item}
            </>
        )
    }
}

export default Board;
