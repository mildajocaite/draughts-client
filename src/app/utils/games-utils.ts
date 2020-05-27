import {User} from "../model/user";

export const getFiveFirstMoves = (moves: string[]) => {
    let combinedMoves = "";
    let movesToCombine = [] as string[];
    let isLessThanFive = false;

    if (moves.length < 11) {
        movesToCombine = moves;
        isLessThanFive = true;
    } else {
        movesToCombine = moves.slice(0, 10);
        isLessThanFive = false;
    }

    movesToCombine.forEach((move, row) => {
        if (row % 2 === 1) {
            combinedMoves = combinedMoves + `${move} `;
        } else {
            combinedMoves = combinedMoves + `${(row / 2) + 1}.${move} `;
        }
    });

    return isLessThanFive ? combinedMoves : combinedMoves + "...";
};

export const combinePlayers = (player1: User, player2: User) => {
    return `${player1.lastname} ${player1.firstname} - ${player2.lastname} ${player2.firstname}`
};