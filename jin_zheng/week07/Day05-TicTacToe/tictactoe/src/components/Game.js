import React, {Component} from 'react';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], [a, b, c]];
    }
  }
  return null;
}

function Square(props) {
    const winner = props.winner;
    const i = props.i
  return (
    <button className="square" onClick={props.onClick} style= { winner && winner[1].includes(i) ? { color: 'red' } : { color: 'black'}} >
      {props.value}
    </button>
  );
}

class Board extends Component{

    renderSquare(i){
        const history = this.props.history;
        const stepNumber = this.props.stepNumber;
        const current = history[this.props.stepNumber];
        const winner = calculateWinner(current.squares);
        return (
            < Square value= {this.props.squares[i]}  onClick={()=> this.props.onClick(i)} i= {i} winner={winner}/>
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

class Game extends Component {
    constructor(props){
        super(props)
        this.state={
            history:[{
                squares: Array(9).fill(null)}],
            xIsNext: true,
            stepNumber: 0,
            position: [],
            showPosition: [],
            asc: true};

            }

        handleClick(i){
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length-1];
            const squares = current.squares.slice();

            if (calculateWinner(squares) || squares[i]) return;
            squares[i] = this.state.xIsNext ? "X" : "O";
            const historyCopy = this.state.acs ? history.unshift([{ squares: squares}]) : history.concat([{ squares: squares}])
            this.setState(
                {history: history.concat([{ squares: squares}]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
                position: this.state.position.concat(i),
                showPosition: this.state.position.concat(i),
                asc: true
            })
            }

            reorderList(){
                this.setState({
                    asc: this.state.asc ? false : true
                })
            }


            jumpTo(step) {
                this.setState({
                    stepNumber: step,
                    xIsNext: (step % 2) === 0,
                    position: this.state.showPosition.slice(0, step),
                })
            }

            render(){
                console.log('remnder')
                const history = this.state.history;
                const current = history[this.state.stepNumber];
                const winner = calculateWinner(current.squares);
                const position = { 0:"row: 1 col: 1", 1:"row: 1 col: 2", 2:"row: 1 col: 3", 3:"row: 2 col: 1", 4:"row: 2 col: 2", 5:"row: 2 col: 3", 6:"row: 3 col: 1", 7:"row: 3 col: 2", 8:"row: 3 col: 3" }
                const showPosition = this.state.asc ? this.state.showPosition : this.state.showPosition.slice(0).reverse();
                const moves = history.map((step, move) => {
                    const desc = move ?
                    'Go to move #' + position[showPosition[move-1]] :
                    'Go to game start';

                    return(
                        <li key={move} >
                        <button onClick={()=> this.jumpTo(move)} style= {move === this.state.stepNumber ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}>
                        {desc}
                        </button>
                        </li>
                    )

                })
                let status;
                if (winner) {
                    status = 'Winner: ' + winner[0];
                } else {
                    if (history.length === 10) {
                        status = "Draw"
                    } else {
                        status = 'Next player: '+ (this.state.xIsNext ? "X" : "O")
                    }
                }
                console.log(this.state.asc);
                return(
                    <div className='game'>
                    <div className='game-board'>
                    <Board
                    squares= {current.squares}
                    onClick= {(i) => this.handleClick(i)}
                    history= {this.state.history}
                    stepNumber= {this.state.stepNumber}
                    />
                    </div>
                    <div className='game-info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    <button onClick= {()=> this.reorderList()}>
                    {this.state.asc ? "desc" : "asc"}
                    </button>
                    </div>
                    </div>
                )
            }
        }

        export default Game
