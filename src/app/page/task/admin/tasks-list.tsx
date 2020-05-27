import React, {useEffect, useState} from 'react';
import {Form, Icon, Popconfirm, Radio} from "antd";
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import {Link} from "react-router-dom";
import styles from './tasks-list.module.scss'
import Row from "antd/lib/grid/row";
import {taskService} from "../../../api/service/task-service";
import {Task} from "../../../model/task";
import {FormComponentProps} from "antd/lib/form";
import {TaskCard} from "../../../components/common/task-card/task-card";
import {getTaskComplexity, getTaskResult, getTaskType} from "../../../utils/task-parameters-decoder";
import {DraughtsBoard} from "../../../components/common/draughts-board/draughts-board";
import {openNotification} from "../../../services/notification-service";
import {ErrorMessage} from "../../../api/common/error-message";
import {LoadingIcon} from "../../../components/common/loading-icon/loading-icon";
import {CancelButton} from "../../../components/common/buttons/cancel-button/cancel-button";
import {SubmitButton} from "../../../components/common/buttons/submit-button/submit-button";

export const TasksListComponent: React.FC<FormComponentProps> =
    (props) => {

        const [isLoading, setIsLoading] = useState(false);
        const [tasks, setTask] = useState([] as Task[]);
        const [taskType, setTaskType] = useState('ALL');
        const [taskComplexity, setTaskComplexity] = useState('ALL');
        const [taskResult, setTaskResult] = useState('ALL');

        useEffect(() => {
            getTasks();
        }, []);

        const getTasks = () => {
            setIsLoading(true);
            taskService.getTasks()
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
        };

        const handleFilterTasks = () => {
            props.form.validateFieldsAndScroll((err, values) => {
                setTaskType(values['taskType']);
                setTaskResult(values['taskSolution']);
                setTaskComplexity(values['complexity']);
            });
        };

        const filterTasks = () => {
            return tasks.filter((task: Task) => {
                return (taskResult === "ALL" || task.taskResult === taskResult) &&
                    (taskType === "ALL" || task.taskType === taskType) &&
                    (taskComplexity === "ALL" || task.taskComplexity === taskComplexity)
            });
        };

        const deleteTask = (task: Task) => {
            taskService.deleteTask(task.id)
                .then(
                    response => {
                        getTasks();
                        openNotification("success", "SĖKMINGAI IŠTRINTAS", "Uždavinys sėkmingai ištrintas.");
                    }
                )
                .catch((error: ErrorMessage) => {
                        openNotification("error", "KLAIDA", error.message);
                    }
                );
        };

        return (
            <Card title="UŽDAVINIAI" style={{margin: '20px'}}>
                <Row>
                    <Link to="/app/task/create">
                        <Button type="primary" className={styles['create-button']}>Sukurti uždavinį</Button>
                    </Link>
                </Row>
                {
                    isLoading
                        ? <LoadingIcon/>
                        :
                        <>
                            <Row>
                                <Form layout="horizontal" onChange={handleFilterTasks}>
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
                                                <Radio.Button value="ATKIRTIMAS">Atkirtimas</Radio.Button>
                                                <Radio.Button value="ZIRKLES">Žirklės</Radio.Button>
                                                <Radio.Button value="KILPA">Kilpa</Radio.Button>
                                                <Radio.Button value="UŽDARYMAS">Uždarymas</Radio.Button>
                                                <Radio.Button value="OPOZICIJA">Opozicija</Radio.Button>

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
                                    {isLoading ?
                                        (
                                            <Icon className={styles["loading-icon"]} type="loading"/>
                                        ) :
                                        (
                                            filterTasks().map((task: Task) => {
                                                return (
                                                    <TaskCard
                                                        key={task.id}
                                                        boardPosition={
                                                            <DraughtsBoard position={task.position}/>
                                                        }
                                                        title={getTaskResult(task.taskResult)}
                                                        subtitles={[
                                                            {
                                                                heading: "Uždavinio tipas",
                                                                text: getTaskType(task.taskType),
                                                            },
                                                            {
                                                                heading: "Sudėtingumas",
                                                                text: getTaskComplexity(task.taskComplexity),
                                                            }
                                                        ]}
                                                        actions={[
                                                            <Popconfirm placement="right"
                                                                        title="Ar tikrai norite ištrinti?"
                                                                        okText="TAIP"
                                                                        cancelText="NE"
                                                                        onConfirm={() => deleteTask(task)}>
                                                                <CancelButton
                                                                    type="primary"
                                                                    text="Ištrinti"
                                                                />
                                                            </Popconfirm>,
                                                            <Link to={{
                                                                pathname: `/app/task/review/${task.id}`,
                                                            }}>
                                                                <SubmitButton
                                                                    type="primary"
                                                                    text="Peržiūrėti"
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
                }
            </Card>
        );
    };

export const TasksList = Form.create({
    name: 'tasks-list-with-filter',
})(TasksListComponent);