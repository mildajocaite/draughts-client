import React, {useEffect, useState} from 'react';
import {Form, Radio} from "antd";
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import {Link} from "react-router-dom";
import styles from './tasks-list.module.scss'
import Row from "antd/lib/grid/row";
import {taskService} from "../../../api/service/task-service";
import {FormComponentProps} from "antd/lib/form";
import {TaskCard} from "../../../components/common/task-card/task-card";
import {getTaskComplexity, getTaskResult, getTaskStatus, getTaskType} from "../../../utils/task-parameters-decoder";
import {DraughtsBoard} from "../../../components/common/draughts-board/draughts-board";
import {openNotification} from "../../../services/notification-service";
import {TaskForStudentToSolve} from "../../../model/task-for-student-to-solve";
import {ErrorMessage} from "../../../api/common/error-message";
import {LoadingIcon} from "../../../components/common/loading-icon/loading-icon";
import {SubmitButton} from "../../../components/common/buttons/submit-button/submit-button";

export const TasksListForStudentComponent: React.FC<FormComponentProps> =
    (props) => {

        const [isLoading, setIsLoading] = useState(false);
        const [tasks, setTask] = useState([] as TaskForStudentToSolve[]);
        const [taskType, setTaskType] = useState('ALL');
        const [taskComplexity, setTaskComplexity] = useState('ALL');
        const [taskResult, setTaskResult] = useState('ALL');
        const [taskStatus, setTaskStatus] = useState("NOT_RESOLVED");

        useEffect(() => {
            setIsLoading(true);
            taskService.getTasksForStudentToSolve()
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
        }, []);

        const handleFilterTasks = () => {
            props.form.validateFieldsAndScroll((err, values) => {
                setTaskType(values['taskType']);
                setTaskResult(values['taskSolution']);
                setTaskComplexity(values['complexity']);
                setTaskStatus(values['taskStatus']);
            });
        };

        const filterTasks = () => {
            return tasks.filter((task: TaskForStudentToSolve) => {
                return (taskResult === "ALL" || task.taskDTO.taskResult === taskResult) &&
                    (taskType === "ALL" || task.taskDTO.taskType === taskType) &&
                    (taskComplexity === "ALL" || task.taskDTO.taskComplexity === taskComplexity) &&
                    (taskStatus === "ALL" || task.taskStatus === taskStatus)
            });
        };

        return (
            <Card title="UŽDAVINIAI" style={{margin: '20px'}}>
                {
                    isLoading
                        ? <LoadingIcon/>
                        : (
                            <>
                                <Row>
                                    <Form layout="horizontal" onChange={handleFilterTasks}>
                                        <Form.Item className={styles['form-row']}>
                                            {props.form.getFieldDecorator('taskStatus',
                                                {
                                                    initialValue: taskStatus
                                                })(
                                                <Radio.Group size="small">
                                                    <Radio.Button value="ALL">Visi</Radio.Button>
                                                    <Radio.Button value="RESOLVED">Išspręsti</Radio.Button>
                                                    <Radio.Button value="NOT_RESOLVED">Nespręsti</Radio.Button>
                                                </Radio.Group>)}
                                        </Form.Item>
                                        <Form.Item className={styles['form-row']}>
                                            {props.form.getFieldDecorator('complexity',
                                                {
                                                    initialValue: taskComplexity
                                                })(
                                                <Radio.Group size="small">
                                                    <Radio.Button value="ALL">Visi</Radio.Button>
                                                    <Radio.Button value="EASY">Lengvi</Radio.Button>
                                                    <Radio.Button value="MEDIUM">Vidutinio sudėtingumo</Radio.Button>
                                                    <Radio.Button value="HARD">Sudėtingi</Radio.Button>
                                                </Radio.Group>)}
                                        </Form.Item>
                                        <Form.Item className={styles['form-row']}>
                                            {props.form.getFieldDecorator('taskType',
                                                {
                                                    initialValue: taskType
                                                })(
                                                <Radio.Group size="small">
                                                    <Radio.Button value="ALL">Visi</Radio.Button>
                                                    <Radio.Button value="ENDSPILIS">Endšpilis</Radio.Button>
                                                    <Radio.Button value="KOMBINACIJA">Kombinacija</Radio.Button>
                                                    <Radio.Button value="SURISIMAS">Surišimas</Radio.Button>
                                                    <Radio.Button value="ZIRKLES">Žirklės</Radio.Button>
                                                </Radio.Group>)}
                                        </Form.Item>
                                        <Form.Item className={styles['form-row']}>
                                            {props.form.getFieldDecorator('taskSolution',
                                                {
                                                    initialValue: taskResult
                                                })(
                                                <Radio.Group size="small">
                                                    <Radio.Button value="ALL">Visi</Radio.Button>
                                                    <Radio.Button value="DRAW">Lygiosios</Radio.Button>
                                                    <Radio.Button value="WHITES_START_AND_WIN">Baltieji pradeda ir
                                                        laimi</Radio.Button>
                                                </Radio.Group>)}
                                        </Form.Item>
                                    </Form>
                                </Row>
                                <Row>
                                    <div className={styles['tasks-list']}>
                                        {isLoading
                                            ? <LoadingIcon/>
                                            : (
                                                filterTasks().map((task: TaskForStudentToSolve) => {
                                                    return (
                                                        <TaskCard
                                                            key={task.taskDTO.id}
                                                            boardPosition={
                                                                <DraughtsBoard position={task.taskDTO.position}/>
                                                            }
                                                            title={getTaskResult(task.taskDTO.taskResult)}
                                                            subtitles={[
                                                                {
                                                                    heading: "Uždavinio tipas",
                                                                    text: getTaskType(task.taskDTO.taskType),
                                                                },
                                                                {
                                                                    heading: "Sudėtingumas",
                                                                    text: getTaskComplexity(task.taskDTO.taskComplexity),
                                                                },
                                                                {
                                                                    heading: "Statusas",
                                                                    text: getTaskStatus(task.taskStatus),
                                                                }
                                                            ]}
                                                            actions={[task.taskStatus === "RESOLVED" ?
                                                                <div>
                                                                    <Link to={{
                                                                        pathname: `tasks-student/review/${task.id}`,
                                                                    }}>
                                                                        <Button type="primary"
                                                                                className={styles['review-button']}
                                                                        >
                                                                            Peržiūrėti
                                                                        </Button>
                                                                    </Link>
                                                                </div> :
                                                                <Link to={{
                                                                    pathname: `tasks-student/solve/${task.taskDTO.id}`,
                                                                }}>
                                                                    <SubmitButton
                                                                        text="Spręsti"
                                                                        type="primary"
                                                                        className={styles['solve-button']}
                                                                    />
                                                                </Link>
                                                            ]}
                                                        />
                                                    );
                                                })
                                            )
                                        }
                                    </div>
                                </Row>
                            </>
                        )
                }
            </Card>
        );
    };

export const TasksListForStudent = Form.create({
    name: 'tasks-list-with-filter',
})(TasksListForStudentComponent);