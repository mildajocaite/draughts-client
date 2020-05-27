import React, {useEffect, useState} from 'react';
import {Col, Row} from "antd";
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import styles from './games-list.module.scss'
import {ColumnsDefinition, TableComponent} from "../../components/common/table/table-component";
import {openNotification} from "../../services/notification-service";
import {gamesService} from "../../api/service/games-service";
import moment from 'moment'
import {combinePlayers, getFiveFirstMoves} from "../../utils/games-utils";
import {Game} from "../../model/game";
import {DraughtsBoard} from "../../components/common/draughts-board/draughts-board";
import {resetBoard} from "../../utils/draught-board-utils";
import {MovesList} from "../../components/common/moves-list/moves-list";
import {ErrorMessage} from "../../api/common/error-message";
import {LoadingIcon} from "../../components/common/loading-icon/loading-icon";

export const GamesList: React.FC =
    () => {

        const [isLoading, setIsLoading] = useState(false);
        const [games, setGames] = useState([] as Game[]);
        const [gameToDisplay, setGameToDisplay] = useState(0);
        const [currentMove, setCurrentMove] = useState(0);

        useEffect(() => {
            setIsLoading(true);
            gamesService.getGames()
                .then(
                    response => {
                        setGames(response);
                        setIsLoading(false);
                    }
                )
                .catch((error: ErrorMessage) => {
                        openNotification("error", "KLAIDA", error.message);
                    }
                )
        }, []);

        const columns: ColumnsDefinition[] = [
            {
                title: 'Žaidėjai',
                key: 'players',
                dataIndex: 'players',
                render: (text, record) =>
                    <div>
                        {combinePlayers(record.player1, record.player2)}
                    </div>,
                sorter: (a, b) => combinePlayers(a.player1, a.player2).localeCompare(combinePlayers(b.player1, b.player2)),
                requiredSearch: true,
            },
            {
                title: 'Rezultatas',
                key: 'result',
                dataIndex: 'result',
                filters: [
                    {
                        text: '2-0',
                        value: '2-0',
                    },
                    {
                        text: '1-1',
                        value: '1-1',
                    },
                    {
                        text: '0-2',
                        value: '0-2',
                    },
                ],
                onFilter: (value, record) => {
                    return record.result === value
                },
                sorter: (a, b) => a.result.localeCompare(b.result),
            },
            {
                title: 'Data',
                key: 'startRecording',
                dataIndex: 'startRecording',
                render: (text, record) => <div>{moment(record.startRecording).format("YYYY-MM-DD")}</div>,
                sorter: (a, b) => {
                    a = new Date(a).getTime();
                    b = new Date(b).getTime();
                    return b > a ? 1 : -1;
                },
                requiredSearch: true,
            },
            {
                title: 'Partija',
                key: 'firstFiveMoves',
                dataIndex: 'phone',
                render: (text, record) => <div>{getFiveFirstMoves(record.moves)}</div>,
                sorter: (a, b) => getFiveFirstMoves(a.moves).localeCompare(getFiveFirstMoves(b.moves)),
                requiredSearch: true,
            },
            {
                title: '',
                key: 'actions',
                dataIndex: 'actions',
                render: (text, record) =>
                    <Button type="primary" onClick={
                        () => {
                            setCurrentMove(0);
                            setGameToDisplay(games.findIndex((item) => {
                                return item.id === record.id;
                            }));
                        }
                    }>
                        PERŽIŪRĖTI
                    </Button>
            },
        ];

        return (
            <Card title="PARTIJOS" style={{margin: '20px'}}>
                {
                    isLoading || !games[gameToDisplay]
                        ? <LoadingIcon/>
                        : (<>
                                <Row justify="center" className={styles.row}>
                                    <Col xs={24} sm={24} md={24} lg={11} xl={9} className={styles["board-column"]}>
                                        <DraughtsBoard
                                            position={resetBoard()}
                                            moves={games[gameToDisplay].moves}
                                            possibleToReview={true}
                                            currentMove={currentMove}
                                            onCurrentMoveChange={setCurrentMove}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={13} xl={15} className={styles['moves-column']}>
                                        <div>
                                            <h3 className={styles.players}>{combinePlayers(games[gameToDisplay].player1, games[gameToDisplay].player2)}</h3>
                                            <div className={styles.moves}>
                                                <MovesList moves={games[gameToDisplay].moves} currentMove={currentMove}
                                                           changeCurrentMove={setCurrentMove}/>
                                                <p className={styles.result}>{games[gameToDisplay].result}</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <div className={styles["table-center"]}>
                                    <TableComponent
                                        columns={columns}
                                        data={games.map((item, index) => (
                                            {
                                                ...item,
                                                key: index,
                                            }
                                        ))}
                                    />
                                </div>
                            </>
                        )
                }
            </Card>
        );
    };