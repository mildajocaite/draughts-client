import React, {useEffect, useState} from 'react';
import {Icon} from "antd";
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import {Link} from "react-router-dom";
import styles from './users-list.module.scss'
import Row from "antd/lib/grid/row";
import {ColumnsDefinition, TableComponent} from "../../components/common/table/table-component";
import {userService} from "../../api/service/user-service";
import {openNotification} from "../../services/notification-service";
import {User} from "../../model/user";
import {navigationService} from "../../services/navigation-service";
import {ErrorMessage} from "../../api/common/error-message";
import {LoadingIcon} from "../../components/common/loading-icon/loading-icon";

export const UsersList: React.FC =
    () => {

        const [isLoading, setIsLoading] = useState(false);
        const [users, setUsers] = useState([] as User[]);

        useEffect(() => {
            getUsers();
        }, []);

        const getUsers = () => {
            setIsLoading(true);
            userService.getUsers()
                .then(
                    response => {
                        setUsers(response);
                        setIsLoading(false);
                    }
                )
                .catch((error: ErrorMessage) => {
                        openNotification("error", "KLAIDA", error.message);
                    }
                );
        };

        const deleteUser = (user: User) => {
            userService.deleteUser(user.id)
                .then(
                    response => {
                        getUsers();
                        openNotification("success", "SĖKMINGAI IŠTRINTAS", "Naudotojas sėkmingai ištrintas.");
                    }
                )
                .catch((error: ErrorMessage) => {
                        openNotification("error", "KLAIDA", error.message);
                    }
                );
        };

        const columns: ColumnsDefinition[] = [
            {
                title: 'Vardas',
                key: 'firstname',
                dataIndex: 'firstname',
                sorter: (a, b) => a.firstname.localeCompare(b.firstname),
                requiredSearch: true,
            },
            {
                title: 'Pavardė',
                key: 'lastname',
                dataIndex: 'lastname',
                sorter: (a, b) => a.lastname.localeCompare(b.lastname),
                requiredSearch: true,
            },
            {
                title: 'El. paštas',
                key: 'email',
                dataIndex: 'email',
                sorter: (a, b) => a.email.localeCompare(b.email),
                requiredSearch: true,
            },
            {
                title: 'Telefonas',
                key: 'phone',
                dataIndex: 'phone',
                render: (text, record) => <div>{record.phone}</div>,
                sorter: (a, b) => a.phone.localeCompare(b.phone),
                requiredSearch: true,
            },
            {
                title: 'Tipas',
                key: 'role',
                dataIndex: 'role',
                filters: [
                    {
                        text: 'TRENERIS',
                        value: 'ROLE_COACH',
                    },
                    {
                        text: 'MOKSLEIVIS',
                        value: 'ROLE_STUDENT',
                    },
                ],
                render: (text, record) => <div>{record.role === "ROLE_COACH" ? "TRENERIS" : "MOKINYS"}</div>,
                onFilter: (value, record) => {
                    return record.role === value
                },
                sorter: (a, b) => a.role.localeCompare(b.role),
            },
            {
                title: 'Priskirta lenta',
                key: 'boardCode',
                dataIndex: 'boardCode',
                sorter: (a, b) => a.boardName.localeCompare(b.boardName),
                render: (text, record) => <div>{record.boardCode === null ? " " +
                    "" : record.boardName + " | " + record.boardCode}</div>,
                requiredSearch: true,
            },
            {
                title: 'Treneris',
                key: 'coach',
                dataIndex: 'coach',
                render: (text, record) =>
                    <div>{record.coach ? `${record.coach.lastname} ${record.coach.firstname}` : ""}</div>,
                requiredSearch: true,
            },
            {
                title: '',
                key: 'actions',
                dataIndex: 'actions',
                render: (text, record) =>
                    <div className={styles["icons"]}>
                        <Icon type="edit" theme="twoTone" className={styles["icon-edit"]}
                              onClick={() => navigationService.redirectToEditUser(record.id)}/>
                        <Icon type="delete" theme="twoTone" className={styles["icon-delete"]}
                              onClick={() => deleteUser(record)}/>
                    </div>
            },
        ];

        return (
            <Card title="NAUDOTOJAI" style={{margin: '20px'}}>
                <Row>
                    <Link to="/app/user/create">
                        <Button type="primary" className={styles['create-button']}>Sukurti naudotoją</Button>
                    </Link>
                </Row>
                {
                    isLoading
                        ? <LoadingIcon/>
                        : (
                            <div className={styles["table-center"]}>
                                <TableComponent
                                    columns={columns}
                                    data={users.map((item, index) => (
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