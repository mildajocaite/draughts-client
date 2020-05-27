import React, {useEffect, useState} from 'react';
import Card from "antd/lib/card";
import moment from 'moment'
import styles from './live-games.module.scss'
import {gamesService} from "../../api/service/games-service";
import {openNotification} from "../../services/notification-service";
import {LiveGame} from "./live-game";
import {LoadingIcon} from "../../components/common/loading-icon/loading-icon";
import {ErrorMessage} from "../../api/common/error-message";
import {Game} from "../../model/game";

const LiveGames = () => {
    const [recordings, setRecording] = useState([] as Game[]);
    const [isLoading, setIsLoading] = useState(true);
    const [updatedDate, setUpdatedDate] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            return getRecordings();
        }, 10000);
        getRecordings();
        return () => clearInterval(interval);
    }, []);

    const getRecordings = async () => {
        gamesService.getRecordings()
            .then(
                response => {
                    const recording = response.filter(record => record.status === 'RECORDING');
                    setRecording(recording);
                    setUpdatedDate(moment().format('YYYY-MM-DD HH:mm:ss'));
                    setIsLoading(false);
                }
            )
            .catch((error: ErrorMessage) => {
                    openNotification("error", "KLAIDA", error.message);
                }
            )
    };

    return (
        <Card title="TIESIOGINĖS TRANSLIACIJOS" style={{margin: '20px'}}>

            {isLoading
                ? <LoadingIcon/>
                : (
                    recordings.length === 0
                        ? <span>Nėra įrašomų partijų</span>
                        : (
                            <div className={styles["games-list"]}>
                                {
                                    recordings.map((item, index) => {
                                            return (
                                                <LiveGame key={index} recording={item} updatedDate={updatedDate}/>
                                            );
                                        }
                                    )
                                }
                            </div>
                        )
                )
            }
        </Card>

    );
};

export {LiveGames};
