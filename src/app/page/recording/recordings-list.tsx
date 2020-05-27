import React, {useEffect, useState} from 'react';
import {Icon} from "antd";
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import {Link} from "react-router-dom";
import styles from './recordings-list.module.scss'
import Row from "antd/lib/grid/row";
import {ColumnsDefinition, TableComponent} from "../../components/common/table/table-component";
import {openNotification} from "../../services/notification-service";
import {navigationService} from "../../services/navigation-service";
import {gamesService} from "../../api/service/games-service";
import moment from 'moment'
import {ErrorMessage} from "../../api/common/error-message";
import {LoadingIcon} from "../../components/common/loading-icon/loading-icon";
import {Game} from "../../model/game";

export const RecordingsList: React.FC =
    () => {

        const [isLoading, setIsLoading] = useState(false);
        const [recordings, setRecordings] = useState([] as Game[]);

        useEffect(() => {
            getRecording();
        }, []);

        const getRecording = () => {
            setIsLoading(true);
            gamesService.getRecordings()
                .then(
                    response => {
                        setRecordings(response);
                        setIsLoading(false);
                    }
                )
                .catch((error: ErrorMessage) => {
                        openNotification("error", "KLAIDA", error.message);
                    }
                );
        };

        const deleteRecording = (recording: Game) => {
            gamesService.deleteRecording(recording.id!)
                .then(
                    response => {
                        getRecording();
                        openNotification("success", "SĖKMINGAI IŠTRINTAS", "Partijos įrašymas sėkmingai ištrintas.");
                    }
                )
                .catch((error: ErrorMessage) => {
                        openNotification("error", "KLAIDA", error.message);
                    }
                );
        };

        const columns: ColumnsDefinition[] = [
            {
                title: 'Baltais žaidžia',
                key: 'player1',
                dataIndex: 'player1',
                render: (text, record) => <div>{`${record.player1.lastname} ${record.player1.firstname}`}</div>,
                sorter: (a, b) => a.player1.localeCompare(b.player1),
                requiredSearch: true,
            },
            {
                title: 'Juodais žaidžia',
                key: 'player2',
                dataIndex: 'player2',
                sorter: (a, b) => a.player2.localeCompare(b.player2),
                render: (text, record) => <div>{`${record.player2.lastname} ${record.player2.firstname}`}</div>,
                requiredSearch: true,
            },
            {
                title: 'Statusas',
                key: 'status',
                dataIndex: 'status',
                render: (text, record) => <div>{record.status === "RECORDING" ? "ĮRAŠOMA" : "ĮRAŠYTA"}</div>,
                filters: [
                    {
                        text: 'ĮRAŠOMA',
                        value: 'RECORDING',
                    },
                    {
                        text: 'ĮRAŠYTA',
                        value: 'RECORDED',
                    },
                ],
                onFilter: (value, record) => {
                    return record.status === value
                },
                sorter: (a, b) => a.status.localeCompare(b.status),
                requiredSearch: true,
            },
            {
                title: 'Šaškių lenta',
                key: 'board',
                dataIndex: 'board',
                render: (text, record) => <div>{`${record.board.name} | ${record.board.code}`}</div>,
                sorter: (a, b) => a.boardCode.localeCompare(b.boardCode),
                requiredSearch: true,
            },
            {
                title: 'Įrašymo pradžia',
                key: 'startRecording',
                dataIndex: 'startRecording',
                render: (text, record) =>
                    <div>
                        {moment(record.startRecording).format("YYYY-MM-DD HH:mm:ss")}
                    </div>,
                sorter: (a, b) => a.startRecording.localeCompare(b.startRecording),
                requiredSearch: true,
            },
            {
                title: 'Įrašymo pabaiga',
                key: 'endRecording',
                dataIndex: 'endRecording',
                render: (text, record) => record.endRecording !== null ?
                    <div>
                        {moment(record.endRecording).format("YYYY-MM-DD HH:mm:ss")}
                    </div> :
                    <></>,
                sorter: (a, b) => a.endRecording.localeCompare(b.endRecording),
                requiredSearch: true,
            },
            {
                title: 'Rezultatas',
                key: 'result',
                dataIndex: 'result',
                sorter: (a, b) => a.result.localeCompare(b.result),
                requiredSearch: true,
            },
            {
                title: '',
                key: 'actions',
                dataIndex: 'actions',
                render: (text, record) =>
                    <div className={styles["icons"]}>
                        <Icon type="edit" theme="twoTone" className={styles["icon-edit"]}
                              onClick={() => navigationService.redirectToEditRecording(record.id)}/>
                        <Icon type="delete" theme="twoTone" className={styles["icon-delete"]}
                              onClick={() => deleteRecording(record)}/>
                    </div>
            },
        ];

        return (
            <Card title="PARTIJŲ ĮRAŠYMAI" style={{margin: '20px'}}>
                <Row>
                    <Link to="/app/recording/create">
                        <Button type="primary" className={styles['create-button']}>Sukurti partijos įrašymą</Button>
                    </Link>
                </Row>
                {
                    isLoading
                        ? <LoadingIcon/>
                        : (
                            <div className={styles["table-center"]}>
                                <TableComponent
                                    columns={columns}
                                    data={recordings.map((item, index) => (
                                        {
                                            ...item,
                                            key: index,
                                        }
                                    ))}
                                />
                            </div>
                        )
                }
            </Card>
        );
    };