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
import {getTaskComplexity, getTaskResult} from "../../../../utils/task-parameters-decoder";
import {Task} from "../../../../model/task";
import {LoadingIcon} from "../../../../components/common/loading-icon/loading-icon";
import {ErrorMessage} from "../../../../api/common/error-message";

interface Params {
    id: string,
}

export const ReviewTask: React.FC<RouteComponentProps<Params>> =
    (props) => {
        const [task, setTask] = useState({} as Task);
        const [isLoading, setIsLoading] = useState(true);
        const [currentMove, setCurrentMove] = useState(0);

        useEffect(() => {
            const taskID: number = parseInt(props.match.params["id"]);
            if (taskID) {
                setIsLoading(true);
                taskService.getTaskByID(taskID)
                    .then(
                        response => {
                            setTask(response);
                            setIsLoading(false);
                        }
                    )
                    .catch((error: ErrorMessage) => {
                            openNotification("error", "KLAIDA", error.message);
                        }
                    );
            }

        }, [props.match.params]);

        return (
            <Card title="UŽDAVINIO PERŽIŪRA" style={{margin: '20px'}}>
                {isLoading
                    ? <LoadingIcon/>
                    : (
                        <Row type="flex" justify="space-around" align="middle">
                            <Col xs={24} sm={24} md={24} lg={11} xl={9} className={styles["board-column"]}>
                                <DraughtsBoard
                                    position={task.position}
                                    possibleToReview={true}
                                    moves={task.solution}
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
                                        {getTaskResult(task.taskResult)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Tipas">{task.taskType}
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label="Sunkumas">{getTaskComplexity(task.taskComplexity)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Sprendimas">
                                        <MovesList moves={task.solution}
                                                   currentMove={currentMove}
                                                   changeCurrentMove={setCurrentMove}
                                        />
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Row>
                    )
                }
            </Card>
        )
    };