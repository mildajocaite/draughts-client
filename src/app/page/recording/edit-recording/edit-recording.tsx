import React, {useEffect, useState} from "react";
import Card from "antd/lib/card";
import {bindActionCreators, Dispatch} from "redux";
import {RootActions} from "../../../redux/actions/root-actions";
import {connect} from "react-redux";
import {updateRecording} from "../redux/recording-action-creator"
import {EditRecordingForm} from "./edit-recording-form";
import {openNotification} from "../../../services/notification-service";
import {RouteComponentProps} from "react-router";
import {gamesService} from "../../../api/service/games-service";
import {Col, Row} from "antd";
import styles from "./edit-recording.module.scss";
import {TaskCard, TaskCardSubtitle} from "../../../components/common/task-card/task-card";
import {getMovesListString, resetBoard} from "../../../utils/draught-board-utils";
import {DraughtsBoard} from "../../../components/common/draughts-board/draughts-board";
import {RecordingGame} from "./recording-game";
import {RecordingInformation} from "./recording-information";
import {LoadingIcon} from "../../../components/common/loading-icon/loading-icon";
import {ErrorMessage} from "../../../api/common/error-message";
import {navigationService} from "../../../services/navigation-service";
import {Game} from "../../../model/game";
import {UpdateRecording} from "../../../model/update-recording";

interface DispatchProps {
    updateRecording: typeof updateRecording;
}

interface Params {
    id: string,
}

type Props = DispatchProps & RouteComponentProps<Params>;

const EditRecodingPageComponent: React.FC<Props> =
    (props) => {

        const [recording, setRecording] = useState({} as Game);
        const [isLoading, setIsLoading] = useState(false);
        const [currentMove, setCurrentMove] = useState(0);

        useEffect(() => {
            setIsLoading(true);
            const recordingID: number = parseInt(props.match.params["id"]);
            if (recordingID) {
                gamesService.getRecording(recordingID)
                    .then(
                        response => {
                            setRecording(response);
                            setCurrentMove(recording.moves ? recording.moves.length : 0);
                            setIsLoading(false);
                        }
                    )
                    .catch((error: ErrorMessage) => {
                            navigationService.redirectToRecordingsList();
                            openNotification("error", "KLAIDA", error.message);
                        }
                    )
            }
        }, [props.match.params]);

        const subtitles: TaskCardSubtitle[] = [
            {
                heading: null,
                text: recording.moves ? getMovesListString(recording.moves) : "Nėra ėjimų.",
            }
        ];

        return (
            <Card title={recording.status === "RECORDED" ? "PERŽIŪRĖTI ĮRAŠYTĄ PARTIJĄ" : "UŽBAIGTI PARTIJOS ĮRAŠYMĄ"}
                  style={{margin: '20px'}}>
                {
                    isLoading || !recording.player1 || !recording.player2 || !recording.board
                        ? <LoadingIcon/>
                        : (
                            <Row type="flex" justify="space-around" align="middle">
                                <Col xs={24} sm={24} md={24} lg={11} xl={9} className={styles["board-column"]}>
                                    {
                                        recording.status === "RECORDED"
                                            ? <TaskCard
                                                boardPosition={
                                                    (
                                                        <DraughtsBoard
                                                            position={resetBoard()}
                                                            moves={recording.moves}
                                                            possibleToReview={true}
                                                            currentMove={currentMove}
                                                            onCurrentMoveChange={setCurrentMove}
                                                        />
                                                    )}
                                                title={""}
                                                subtitles={subtitles}
                                            />
                                            : <RecordingGame id={parseInt(props.match.params["id"])}/>
                                    }
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={13} xl={15}>
                                    {
                                        recording.status === "RECORDED"
                                            ? <RecordingInformation recording={recording}/>
                                            : <EditRecordingForm
                                                initialValues={{
                                                    id: recording.id,
                                                    board: recording.board.code,
                                                    player1: recording.player1.email,
                                                    player2: recording.player2.email,
                                                    result: "2-0",
                                                } as UpdateRecording}
                                                onSubmit={() => props.updateRecording(recording.id!)}
                                            />
                                    }
                                </Col>
                            </Row>
                        )
                }
            </Card>
        );
    };


const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => bindActionCreators({
    updateRecording: updateRecording,
}, dispatch);

const EditRecording = connect(null, mapDispatchToProps)(EditRecodingPageComponent);

export {EditRecording}