import React, {useEffect, useState} from 'react';
import styles from "./top-tasks.module.scss";
import {statisticService} from "../../../api/service/statistic-service";
import {TaskCard} from "../../common/task-card/task-card";
import {DraughtsBoard} from "../../common/draughts-board/draughts-board";
import {openNotification} from "../../../services/notification-service";
import {TopTask} from "./model/TopTask";
import {getTaskComplexity, getTaskResult, getTaskType} from "../../../utils/task-parameters-decoder";
import {LoadingIcon} from "../../common/loading-icon/loading-icon";
import {ErrorMessage} from "../../../api/common/error-message";

export const TopTasks: React.FC<{}> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [topTasks, setTopTasks] = useState([] as TopTask[]);

    useEffect(() => {
        setIsLoading(true);
        statisticService.getTopTasks()
            .then(
                response => {
                    setTopTasks(response);
                    setIsLoading(false);
                }
            )
            .catch((error: ErrorMessage) => {
                    openNotification("error", "KLAIDA", error.message);
                }
            )
    }, []);

    return (
        <div>
            {
                isLoading
                    ? <LoadingIcon/>
                    : (
                        <div className={styles['tasks-list']}>
                            {
                                topTasks.map((topTask, index) => {
                                    return (
                                        <TaskCard key={index} boardPosition={
                                            <DraughtsBoard position={topTask.position}/>
                                        }
                                                  title={`Išspręsta kartų: ${topTask.numberOfSolves}`}
                                                  subtitles={[
                                                      {
                                                          heading: "Uždavinio tipas:",
                                                          text: getTaskType(topTask.type),
                                                      },
                                                      {
                                                          heading: "Sudėtingumas:",
                                                          text: getTaskComplexity(topTask.complexity),
                                                      },
                                                      {
                                                          heading: "Uždavinio sąlyga:",
                                                          text: getTaskResult(topTask.result),
                                                      }
                                                  ]}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
            }
        </div>
    );
};