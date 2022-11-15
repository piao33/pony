export function calcWinners(sitem: any[]) {

    const winLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < winLines.length; i++) {
        const [a, b, c] = winLines[i];
        if (sitem[a].value && sitem[a].value === sitem[b].value && sitem[a].value === sitem[c].value) {
            return [a,b,c]
        }
    }
    return null;
}

export function calcCoordinate(coordinateber: number): number[] {
    const x:number = coordinateber % 3;
    const y:number = Math.floor(coordinateber / 3);
    return [x, y]
}