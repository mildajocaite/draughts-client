import {User} from "./user";
import {Board} from "./board";

export interface Game {
    id: number,
    player1: User,
    player2: User,
    result: string,
    startRecording: Date,
    endRecording?: Date,
    board: Board,
    status: string,
    moves: string[]
}