import React from 'react';
import { calcWinners, calcCoordinate } from './utils';
import Board from './board';
class Coordinateber {
    x = null;
    y = null;
    step = null;
    value = null;
}
export default class ThreeChess extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill({x: null,
                    y: null,
                    step: null,
                    value: null,}),
            }],
            isNext: true,
            stepNumber: 0,
            isAsc: false,
        }
    }
    handleClick = (i: number) => {
        const history = JSON.parse(JSON.stringify(this.state.history.slice(0, this.state.stepNumber + 1)));
        const current = history[history.length - 1];
        const squares = JSON.parse(JSON.stringify(current.squares.slice()));

        if (calcWinners(squares) || squares[i].value) return;
        squares[i].value = this.state.isNext ? 'O' : 'X';
        const coordinate = calcCoordinate(i);
        squares[i].x = coordinate[0];
        squares[i].y = coordinate[1];
        squares[i].step = history.length;
        this.setState({
            history: history.concat([{ squares: squares }]),
            stepNumber: history.length,
            isNext: !this.state.isNext,
        })
        console.log(squares)
    }
    jumpTo(step: number) {
        this.setState({
            isNext: step % 2 == 0,
            stepNumber: step,
        })
    }
    changeOrder() {
        this.setState({
            isAsc: !this.state.isAsc,
        })
    }

    render() {
        console.log('render')
        let history = this.state.history.slice(0);
        const current = history[this.state.stepNumber];
        const winner = calcWinners(current.squares);
        history =  this.state.isAsc ? history.reverse() : history;
        const moves = history.map((step: any, move: number) => {
            const arr = step.squares.slice(0);
            const coordinatebers = arr.sort((itemA: any, itemB: any) => itemA.step - itemB.step )
                                       .filter((item: any) => item.value !== null)
                                       .map((item: any) => [item.x, item.y])
                                       .join('|');
            let desc = (move === 0 && !this.state.isAsc) || (move === history.length - 1 && this.state.isAsc) 
                        ? `game start`
                        : `move to ${move} step ${coordinatebers}`;
            return (<li className={`${(this.state.stepNumber === move && !this.state.isAsc || this.state.isAsc && this.state.stepNumber ===  history.length - 1 - move) ? 'bold' : ''} history`} key={move.toString()}>
                <button onClick={() => this.jumpTo(this.state.isAsc ? history.length - 1 - move : move)}>{desc}</button>
            </li>)
        })

        let status, orderText;
        if (winner) {
            const winText = this.state.isNext ? 'X' : 'O'
            status = `winner: ${winText}`;
            setTimeout(() => {
                alert('winner is '+winText)
            }, 0);
        } else if(history.length === 10 && this.state.stepNumber === 9) {
            status = "It's too bad, no one wins";
            setTimeout(() => {
                alert("It's too bad, no one wins")
            }, 0);
        }else {
            status = `next player: ${this.state.isNext ? 'O' : 'X'}`;
        }

        orderText = this.state.isAsc ? '降序' : '升序';
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winnerList={winner}
                        onClick={(i: number) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <button onClick={()=> this.changeOrder()}>{orderText}</button>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
