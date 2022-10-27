import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// class Square extends React.Component <{ value: number, onClick: Function }, any>{
//   constructor(props:any) {
//     super(props);
//   }
//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={this.click}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
//   click =() =>{
//     this.props.onClick();
//   }
// }

function Square(props: { value: number, onClicks: Function }) {
  return (
      <button 
        className="square" 
        onClick={()=> props.onClicks()}
      >
        {props.value}
      </button>
  )
}

class Board extends React.Component< any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isNext: false,
    }
  }
  renderSquare(i:number) {
    return <Square value={this.state.squares[i]} onClicks={()=> this.handleClick(i)}/>;
  }
  handleClick=(i:number)=>{
    const squ = this.state.squares.slice();
    squ[i] = this.state.isNext ? 'O' : 'X';
    console.log(i,squ)
    this.setState({
      squares: squ,
      isNext: !this.state.isNext,
    })
  }

  render() {
    const status = `Next player: ${this.state.isNext ? 'O' : 'X'}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Game />);

