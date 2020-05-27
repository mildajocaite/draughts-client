import React, {useEffect, useState} from "react";
import {openNotification} from "../../../services/notification-service";
import {gamesService} from "../../../api/service/games-service";
import {TaskCard, TaskCardSubtitle} from "../../../components/common/task-card/task-card";
import {getMovesListString, resetBoard} from "../../../utils/draught-board-utils";
import {DraughtsBoard} from "../../../components/common/draughts-board/draughts-board";
import moment from "moment";
import {navigationService} from "../../../services/navigation-service";
import {ErrorMessage} from "../../../api/common/error-message";
import {Game} from "../../../model/game";
import {LoadingIcon} from "../../../components/common/loading-icon/loading-icon";

interface OwnProps {
    id: number,
}

export const RecordingGame: React.FC<OwnProps> =
    (props) => {

        const [recording, setRecording] = useState({} as Game);
        const [isLoading, setIsLoading] = useState(false);
        const [currentMove, setCurrentMove] = useState(0);
        const [updatedDate, setUpdatedDate] = useState();

        useEffect(() => {
            const interval = setInterval(() => {
                return getRecording();
            }, 10000);
            getRecording();
            return () => clearInterval(interval);
        }, []);

        const getRecording = () => {
            setIsLoading(true);
            gamesService.getRecording(props.id)
                .then(
                    response => {
                        setUpdatedDate(moment().format('YYYY-MM-DD HH:mm:ss'));
                        if (recording.id) {
                            setRecording({
                                ...recording,
                                moves: recording.moves,
                            });
                        }
                        setCurrentMove(response.moves ? response.moves.length : 0);
                        setRecording(response);
                        setIsLoading(false);
                    }
                )
                .catch((error: ErrorMessage) => {
                        navigationService.redirectToRecordingsList();
                        openNotification("error", "KLAIDA", error.message);
                    }
                )
        };

        const subtitles: TaskCardSubtitle[] = [
            {
                heading: "Atnaujinta",
                text: updatedDate,
            },
            {
                heading: "Partija",
                text: recording.moves ? getMovesListString(recording.moves) : "Nėra ėjimų.",
            }
        ];

        return (
            isLoading
                ? <LoadingIcon/>
                : (<>
                        {
                            <TaskCard
                                boardPosition={
                                    (
                                        <DraughtsBoard
                                            position={resetBoard()}
                                            moves={recording.moves}
                                            currentMove={currentMove}
                                            onCurrentMoveChange={setCurrentMove}
                                            possibleToReview={true}
                                        />
                                    )}
                                title={""}
                                subtitles={subtitles}/>

                        }
                    </>
                )
        );
    };