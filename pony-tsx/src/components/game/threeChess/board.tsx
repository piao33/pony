import Square from "./square";

export default function Board(props: { squares: any, onClick: Function, winnerList: number[] | null }) {

    function isWinSquare(i: number) {
        if(props.winnerList) {
            return props.winnerList.includes(i);
        }else {
            return false;
        }
    }
    function renderSquare(i: number) {
        return <Square
            value={props.squares[i].value}
            isWin={isWinSquare(i)}
            key={i}
            onClicks={() => props.onClick(i)}
        />;
    }

    let rowNum = 3, arr = Array(3).fill(null);
    
    return (
        <div>
            { 
                arr.map((item1,index1)=> {
                    let html = arr.map((item2,index2)=> {
                        return (renderSquare(index1 * rowNum + index2))
                    })
                    return (<div key={index1} className="board-row">{html}</div>)
                }) 
            }
        </div>
    );
}


