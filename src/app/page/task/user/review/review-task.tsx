import React, {useEffect, useState} from 'react';
import {Card} from "antd";
import {RouteComponentProps} from "react-router-dom";
import {Col, Row} from "antd/lib/grid";
import styles from './review-task.module.scss';
import Descriptions from "antd/lib/descriptions";
import {taskService} from "../../../../api/service/task-service";
import {openNotification} from "../../../../services/notification-service";
import {DraughtsBoard} from "../../../../components/common/draughts-board/draughts-board";
import {MovesList} from "../../../../components/common/moves-list/moves-list";
import {TaskForStudentToSolve} from "../../../../model/task-for-student-to-solve";
import {getTaskComplexity, getTaskResult, getTaskStatus} from "../../../../utils/task-parameters-decoder";
import Moment from "react-moment";
import {LoadingIcon} from "../../../../components/common/loading-icon/loading-icon";
import {ErrorMessage} from "../../../../api/common/error-message";
import {navigationService} from "../../../../services/navigation-service";

interface Params {
    id: string,
}

export const ReviewTaskForStudent: React.FC<RouteComponentProps<Params>> =
    (props) => {
        const [taskForStudent, setTaskForStudent] = useState({} as TaskForStudentToSolve);
        const [isLoading, setIsLoading] = useState(true);
        const [currentMove, setCurrentMove] = useState(0);

        useEffect(() => {
            const taskID: number = parseInt(props.match.params["id"]);
            if (taskID) {
                setIsLoading(true);
                taskService.getTaskForStudentToSolve(taskID)
                    .then(
                        response => {
                            setTaskForStudent(response);
                            setIsLoading(false);
                        }
                    )
                    .catch((error: ErrorMessage) => {
                            navigationService.redirectToStudentTasksList();
                            openNotification("error", "KLAIDA", error.message);
                        }
                    );
            }

        }, [props.match.params]);

        return (
            <Card title="UŽDAVINIO SPRENDIMAS" style={{margin: '20px'}}>
                {isLoading
                    ? <LoadingIcon/>
                    : (
                        <Row type="flex" justify="space-around" align="middle">
                            <Col xs={24} sm={24} md={24} lg={11} xl={9} className={styles["board-column"]}>
                                <DraughtsBoard
                                    position={taskForStudent.taskDTO.position}
                                    possibleToReview={true}
                                    moves={taskForStudent.taskDTO.solution}
                                    currentMove={currentMove}
                                    onCurrentMoveChange={setCurrentMove}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={13} xl={15}>
                                <Descriptions
                                    layout="horizontal"
                                    column={1}
                                    size={"small"}
                                    bordered>
                                    <Descriptions.Item label="Užduotis">
                                        {getTaskResult(taskForStudent.taskDTO.taskResult)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Tipas">{taskForStudent.taskDTO.taskType}
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label="Sunkumas">{getTaskComplexity(taskForStudent.taskDTO.taskComplexity)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Sprendimas">
                                        <MovesList moves={taskForStudent.taskDTO.solution}
                                                   currentMove={currentMove}
                                                   changeCurrentMove={setCurrentMove}
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label="Statusas">{getTaskStatus(taskForStudent.taskStatus)}
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label="Išsprendimo data">
                                        <Moment format="YYYY-MM-DD HH:mm">
                                            {taskForStudent.resolvedDate}
                                        </Moment>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Row>
                    )
                }
            </Card>
        )
    };