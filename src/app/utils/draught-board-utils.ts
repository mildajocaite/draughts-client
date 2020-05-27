const getCoordinates = (move: string) => {
    const firstLetter = move.charAt(0);
    const firstNumber = move.charAt(1);
    const secondLetter = move.charAt(3);
    const secondNumber = move.charAt(4);
    return [getNumberByLetter(firstLetter), firstNumber, getNumberByLetter(secondLetter), secondNumber];
};

export const resetBoard = () => {
    return [

        [6, 2, 6, 2, 6, 2, 6, 2],
        [2, 6, 2, 6, 2, 6, 2, 6],
        [6, 2, 6, 2, 6, 2, 6, 2],
        [5, 6, 5, 6, 5, 6, 5, 6],
        [6, 5, 6, 5, 6, 5, 6, 5],
        [1, 6, 1, 6, 1, 6, 1, 6],
        [6, 1, 6, 1, 6, 1, 6, 1],
        [1, 6, 1, 6, 1, 6, 1, 6]
    ];
};

export const emptyBoard = () => {
    return [
        [6, 5, 6, 5, 6, 5, 6, 5],
        [5, 6, 5, 6, 5, 6, 5, 6],
        [6, 5, 6, 5, 6, 5, 6, 5],
        [5, 6, 5, 6, 5, 6, 5, 6],
        [6, 5, 6, 5, 6, 5, 6, 5],
        [5, 6, 5, 6, 5, 6, 5, 6],
        [6, 5, 6, 5, 6, 5, 6, 5],
        [5, 6, 5, 6, 5, 6, 5, 6]
    ];
};

export const checkIfBoardIsEmpty = (board: number[][]):boolean => {
    const emptyPosition = emptyBoard();
    let isEqual = true;
    board.forEach((row, rowIndex) =>{
        row.forEach((type, columnIndex) => {
            if(type != emptyPosition[rowIndex][columnIndex]){
                isEqual = false;
            }
        })
    });

    return isEqual;
};

export const getNumberByLetter = (letter: string): number => {
    switch (letter) {
        case "a":
            return 0;
        case "b":
            return 1;
        case "c":
            return 2;
        case "d":
            return 3;
        case "e":
            return 4;
        case "f":
            return 5;
        case "g":
            return 6;
        default:
            return 7;
    }
};

export const getPositionByMoveNumber = (position: number[][], move: Number, game: string[]) => {
    let result;
    if (move === 0) {
        return [...position];
    }
    for (let i = 0; i < move; i++) {
        result = getNextMoveBoard(position, game[i]);
    }
    return result;
};

export const getNextMoveBoard = (currentState: number[][], move: string) => {
    const coordinates = getCoordinates(move);
    const startCoordinateLetter = Number(coordinates[0]);
    const startCoordinateNumber = 8 - Number(coordinates[1]);
    const finishCoordinateLetter = Number(coordinates[2]);
    const finishCoordinateNumber = 8 - Number(coordinates[3]);
    let type = currentState[startCoordinateNumber][startCoordinateLetter];
    if (move.includes(':')) {
        //KIRTIMAS
        const colonSeparation = move.split(":");
        colonSeparation.splice(0, 1);
        let previousMoveLetter = startCoordinateLetter;
        let previousMoveNumber = startCoordinateNumber;
        colonSeparation.forEach(element => {
            const finishJumpLetter = getNumberByLetter(element.charAt(0));
            const finishJumpNumber = 8 - Number(element.charAt(1));
            if (type === 3 || type === 4) {
                //DAMA
                for (let i = 1; i < Math.abs(previousMoveNumber - finishJumpNumber); i++) {
                    if (previousMoveLetter < finishJumpLetter) {
                        const numberKingJumpRemove = (previousMoveNumber < finishJumpNumber) ? previousMoveNumber + i : previousMoveNumber - i;
                        const letterKingJumpRemove = previousMoveLetter + i;
                        currentState[numberKingJumpRemove][letterKingJumpRemove] = 5;
                    } else {
                        const numberKingJumpRemove = (previousMoveNumber < finishJumpNumber) ? previousMoveNumber + i : previousMoveNumber - i;
                        const letterKingJumpRemove = previousMoveLetter - i;
                        currentState[numberKingJumpRemove][letterKingJumpRemove] = 5;
                    }
                }
                currentState[previousMoveNumber][previousMoveLetter] = 5;
                currentState[finishJumpNumber][finishJumpLetter] = type;
            } else {
                //KERTA PAPRASTA SASKE
                if (type === 2 && finishJumpNumber === 7) {
                    type = 4;
                }
                if (type === 1 && finishJumpNumber === 0) {
                    type = 3;
                }
                const letterToClear = (previousMoveLetter + finishJumpLetter) / 2;
                const numberToClear = (previousMoveNumber + finishJumpNumber) / 2;
                currentState[numberToClear][letterToClear] = 5;
                currentState[previousMoveNumber][previousMoveLetter] = 5;
                currentState[finishJumpNumber][finishJumpLetter] = type;
            }
            previousMoveLetter = finishJumpLetter;
            previousMoveNumber = finishJumpNumber;
        });
    } else {
        //PAPRASTAS EJIMAS
        let isChanged = false;
        currentState[startCoordinateNumber][startCoordinateLetter] = 5;
        if (type === 1 && finishCoordinateNumber === 0) {
            currentState[finishCoordinateNumber][finishCoordinateLetter] = 3;
            isChanged = true;
        }
        if (type === 2 && finishCoordinateNumber === 7) {
            currentState[finishCoordinateNumber][finishCoordinateLetter] = 4;
            isChanged = true;
        }
        if (!isChanged) {
            currentState[finishCoordinateNumber][finishCoordinateLetter] = type;
        }
    }

    return [...currentState];

};

export const getMovesListString = (moves: string[]) => {
    let movesString = "";
    for (let i = 0; i < moves.length; i++) {
        if (i % 2 !== 1) {
            movesString += i / 2 + 1;
            movesString += ".";
            movesString += moves[i];
        } else {
            movesString += " ";
            movesString += moves[i];
            movesString += " ";
        }
    }
    return movesString;
};