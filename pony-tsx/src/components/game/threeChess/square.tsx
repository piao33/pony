
export default function Square(props: { value: number, onClicks: Function }) {
    return (
        <button
            className="square"
            onClick={() => props.onClicks()}
        >
            {props.value}
        </button>
    )
}
