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
        }
    }
    handleClick = (i: number) => {
        console.log(i)
        const history = JSON.parse(JSON.stringify(this.state.history.slice(0, this.state.stepNumber + 1)));
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // squares[i].value = 1;
        console.log(squares[i], squares[i-1]);
        console.log(squares[i] === squares[i-1]);

        if (calcWinners(squares) || squares[i].value) return;
        squares[i].value = this.state.isNext ? 'O' : 'X';
        this.setState({
            history: history.concat([{ squares: squares }]),
            stepNumber: history.length,
            isNext: !this.state.isNext,
        })
    }
    jumpTo(step: number) {
        this.setState({
            isNext: step % 2 == 0,
            stepNumber: step,
        })
    }

    render() {
        console.log('render')
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calcWinners(current.squares);

        const moves = history.map((step: any, move: number) => {
            console.log(step)
            // const coordinatebers = step.squares.map((item: [number,null]) => typeof item === 'number')
            //                            .map((item: number) => calcCoordinate(item));
                        // let c = step.squares.map((item: [string,null], index: number) => item !== null ? index : null)
                        // let a = c.filter((item: [number,null]) =>  item !== null)
                        // console.log(a);
                        // let b = a.map((item: number) => calcCoordinate(item));
                        const coordinatebers = '';
                        // console.log(coordinatebers)
            let desc = move
                ? `move to ${move} step ${coordinatebers}`
                : `game start`;
            return (<li key={move.toString()}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>)
        })

        let status;
        if (winner) {
            status = `winner: ${winner}`;
        } else {
            status = `next player: ${this.state.isNext ? 'X' : 'O'}`;
        }
        console.log('current', current.squares)
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i: number) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
