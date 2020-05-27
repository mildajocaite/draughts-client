import React, {useEffect, useState} from 'react';
import {Row} from "antd/lib/grid";
import styles from './solve-task-table.module.scss';
import {taskService} from "../../../../api/service/task-service";
import {
    openNotification,
    openNotificationAddPosition,
    openNotificationCorrectPosition,
    openNotificationCorrectSolution
} from "../../../../services/notification-service";
import {TaskForStudentToSolve} from "../../../../model/task-for-student-to-solve";
import {navigationService} from "../../../../services/navigation-service";
import {Button, Descriptions} from "antd";
import {getTaskComplexity, getTaskResult, getTaskStatus, getTaskType} from "../../../../utils/task-parameters-decoder";
import {ErrorMessage} from "../../../../api/common/error-message";

interface OwnProps {
    taskForStudent: TaskForStudentToSolve,
}

export const SolveTaskTable: React.FC<OwnProps> =
    (props) => {

        const [taskForStudent, setTaskForStudent] = useState({} as TaskForStudentToSolve);

        useEffect(() => {
            const interval = setInterval(() => {
                return solveTask();
            }, 10000);
            return () => clearInterval(interval);
        }, [props.taskForStudent, taskForStudent.taskStatus]);

        const restartTask = () => {
            taskService.getTaskForStudentToSolve(props.taskForStudent.id)
                .then(
                    response => {
                        setTaskForStudent(response);
                        openNotificationAddPosition();
                    }
                )
                .catch((error: ErrorMessage) => {
                        openNotification("error", "KLAIDA", error.message);
                    }
                );
        };

        const solveTask = async () => {
            if (!taskForStudent.id || taskForStudent.taskStatus === "NOT_RESOLVED") {
                taskService.checkIfStartPositionRight(props.taskForStudent.id)
                    .then(
                        response => {
                            if (response.taskStatus === "CORRECT_POSITION") {
                                setTaskForStudent(response);
                                openNotificationCorrectPosition();
                            }
                        }
                    )
                    .catch((error: ErrorMessage) => {
                            openNotification("error", "KLAIDA", error.message);
                        }
                    );
            }
            if (taskForStudent.taskStatus === "CORRECT_POSITION") {
                taskService.checkIfSolutionRight(props.taskForStudent.id)
                    .then(
                        response => {
                            if (response.taskStatus === "RESOLVED") {
                                setTaskForStudent(response);
                                openNotificationCorrectSolution();
                                navigationService.redirectToStudentTasksReview(response.id);
                            }
                        }
                    )
                    .catch((error: ErrorMessage) => {
                            openNotification("error", "KLAIDA", error.message);
                        }
                    );
            }
        };

        return (
            <div>
                <Row>
                    <Descriptions
                        layout="horizontal"
                        column={1}
                        size={"small"}
                        bordered>
                        <Descriptions.Item
                            label="Užduotis"
                        >
                            {getTaskResult(props.taskForStudent.taskDTO.taskResult)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tipas">
                            {getTaskType(props.taskForStudent.taskDTO.taskType)}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Sunkumas">
                            {getTaskComplexity(props.taskForStudent.taskDTO.taskComplexity)}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Statusas">
                            {getTaskStatus(props.taskForStudent.taskStatus)}
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
                <Row type="flex" justify="end">
                    <Button type="primary"
                            className={styles['solve-again-button']}
                            onClick={restartTask}>
                        Spręsti iš naujo
                    </Button>
                </Row>
            </div>
        )
    };