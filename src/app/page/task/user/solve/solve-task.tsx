import React, {useEffect, useState} from 'react';
import {Card} from "antd";
import {RouteComponentProps} from "react-router-dom";
import {Col, Row} from "antd/lib/grid";
import styles from './solve-task.module.scss';
import {taskService} from "../../../../api/service/task-service";
import {openNotification} from "../../../../services/notification-service";
import {TaskForStudentToSolve} from "../../../../model/task-for-student-to-solve";
import {DraughtsBoard} from "../../../../components/common/draughts-board/draughts-board";
import {SolveTaskTable} from "./solve-task-table";
import {ErrorMessage} from "../../../../api/common/error-message";
import {LoadingIcon} from "../../../../components/common/loading-icon/loading-icon";

interface Params {
    id: string,
}

export const SolveTask: React.FC<RouteComponentProps<Params>> =
    (props) => {
        const [taskForStudent, setTaskForStudent] = useState({} as TaskForStudentToSolve);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const taskID: number = parseInt(props.match.params["id"]);
            if (taskID) {
                setIsLoading(true);
                taskService.getTaskForStudentOrCreateNew(taskID)
                    .then(
                        response => {
                            setTaskForStudent(response);
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
            <Card title="UŽDAVINIO SPRENDIMAS" style={{margin: '20px'}}>
                {isLoading
                    ? <LoadingIcon/>
                    : (
                        <Row type="flex" justify="space-around" align="middle">
                            <Col xs={24} sm={24} md={24} lg={11} xl={9} className={styles["board-column"]}>
                                <DraughtsBoard
                                    position={taskForStudent.taskDTO.position}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={13} xl={15}>
                                <SolveTaskTable taskForStudent={taskForStudent}/>
                            </Col>
                        </Row>
                    )
                }
            </Card>
        )
    };