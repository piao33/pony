
export default function Square(props: { value: number, onClicks: Function, isWin: Boolean }) {
    return (
        <button
            className={`square ${props.isWin ? 'win-square' : ''}`}
            onClick={() => props.onClicks()}
        >
            {props.value}
        </button>
    )
}
