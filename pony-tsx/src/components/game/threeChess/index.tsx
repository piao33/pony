import React from 'react';
import calcWinners from './utils';
import Board from './board';

export default class ThreeChess extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            isNext: true,
            stepNumber: 0,
        }
    }
    handleClick = (i: number) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calcWinners(squares) || squares[i]) return;
        squares[i] = this.state.isNext ? 'O' : 'X';
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
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calcWinners(current.squares);

        const moves = history.map((step: any, move: number) => {
            let desc = move
                ? `move to ${move} step`
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
