import React, {useState} from 'react';
import {TaskCard, TaskCardSubtitle} from "../../components/common/task-card/task-card";
import {DraughtsBoard} from "../../components/common/draughts-board/draughts-board";
import {getMovesListString, resetBoard} from "../../utils/draught-board-utils";
import moment from 'moment'
import {Game} from "../../model/game";

interface OwnProps {
    recording: Game;
    updatedDate: Date;
}

export const LiveGame: React.FC<OwnProps> =
    (props) => {

        const [currentMove, setCurrentMove] = useState(props.recording.moves ? props.recording.moves.length : 0);

        const title = `${props.recording.player1.lastname} ${props.recording.player1.firstname} - ${props.recording.player2.lastname} ${props.recording.player2.firstname}`;

        const subtitles: TaskCardSubtitle[] = [
            {
                heading: "Įrašymo pradžia:",
                text: moment(props.recording.startRecording).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                heading: "Atnaujinta::",
                text: moment(props.updatedDate).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                heading: "Partija:",
                text: props.recording.moves ? getMovesListString(props.recording.moves) : "Nėra ėjimų.",
            }
        ];

        return (
            <TaskCard
                boardPosition={
                    <DraughtsBoard
                        position={resetBoard()}
                        moves={props.recording.moves}
                        currentMove={props.recording.moves.length}
                        onCurrentMoveChange={setCurrentMove}
                        possibleToReview={true}
                    />
                }
                title={title}
                subtitles={subtitles}
                bigger={true}
            />
        )
    };