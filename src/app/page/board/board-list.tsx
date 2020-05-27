import React, {useEffect, useState} from 'react';
import {Icon} from "antd";
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import {Link} from "react-router-dom";
import styles from './board-list.module.scss'
import Row from "antd/lib/grid/row";
import {ColumnsDefinition, TableComponent} from "../../components/common/table/table-component";
import {openNotification} from "../../services/notification-service";
import {navigationService} from "../../services/navigation-service";
import {boardService} from "../../api/service/board-service";
import {Board} from "../../model/board";
import moment from 'moment';
import {ErrorMessage} from "../../api/common/error-message";
import {LoadingIcon} from "../../components/common/loading-icon/loading-icon";

export const BoardList: React.FC =
    () => {

        const [isLoading, setIsLoading] = useState(false);
        const [boards, setBoards] = useState([] as Board[]);

        useEffect(() => {
            setIsLoading(true);
            getBoards();
        }, []);

        const getBoards = () => {
            boardService.getBoards()
                .then(
                    response => {
                        setBoards(response);
                        setIsLoading(false);
                    }
                )
                .catch((error: ErrorMessage) => {
                        openNotification("error", "KLAIDA", error.message);
                    }
                )
        };

        const deleteBoard = (board: Board) => {
            if (board.id) {
                boardService.deleteBoard(board.id)
                    .then(
                        response => {
                            getBoards();
                            openNotification("success", "SĖKMINGAI IŠTRINTA", "Šaškių lenta sėkmingai ištrinta.");

                        }
                    )
                    .catch((error: ErrorMessage) => {
                            openNotification("error", "KLAIDA", error.message);
                        }
                    )
            }
        };

        const columns: ColumnsDefinition[] = [
            {
                title: 'Pavadinimas',
                key: 'name',
                dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
                requiredSearch: true,
            },
            {
                title: 'Kodas',
                key: 'code',
                dataIndex: 'code',
                sorter: (a, b) => a.code.localeCompare(b.code),
                requiredSearch: true,
            },
            {
                title: 'Pridėjimo data',
                key: 'createdDate',
                dataIndex: 'createdDate',
                render: (text, record) => <div>{moment(record.created_date).format("YYYY-MM-DD")}</div>,
                requiredSearch: true,
            },
            {
                title: '',
                key: 'actions',
                dataIndex: 'actions',
                render: (text, record) =>
                    <div className={styles["icons"]}>
                        <Icon type="edit" theme="twoTone" className={styles["icon-edit"]}
                              onClick={() => navigationService.redirectToEditBoard(record.id)}/>
                        <Icon type="delete" theme="twoTone" className={styles["icon-delete"]}
                              onClick={(event) => deleteBoard(record)}/>
                    </div>
            },
        ];

        return (
            <Card title="ŠAŠKIŲ LENTOS" style={{margin: '20px'}}>
                <Row>
                    <Link to="/app/board/create">
                        <Button type="primary" className={styles['create-button']}>Sukurti šaškių lentą</Button>
                    </Link>
                </Row>
                {
                    isLoading
                        ? <LoadingIcon/>
                        : (
                            <div className={styles["table-center"]}>
                                <TableComponent
                                    columns={columns}
                                    data={boards.map((item, index) => (
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