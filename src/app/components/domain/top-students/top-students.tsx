import React, {useEffect, useState} from 'react';
import {DatePicker} from "antd";
import styles from "./top-students.module.scss";
import moment from 'moment'
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import {statisticService} from "../../../api/service/statistic-service";
import {openNotification} from "../../../services/notification-service";
import {TopStudent} from "./model/top-student";
import {ColumnsDefinition, TableComponent} from "../../common/table/table-component";
import {ErrorMessage} from "../../../api/common/error-message";
import {LoadingIcon} from "../../common/loading-icon/loading-icon";

const {RangePicker} = DatePicker;

export const TopStudents: React.FC<{}> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [topStudents, setTopStudents] = useState([] as TopStudent[]);
    const [startDate, setStartDate] = useState(moment().startOf('month'));
    const [endDate, setEndDate] = useState(moment().endOf('month'));

    useEffect(() => {
        setIsLoading(true);
        statisticService.getTopStudents(startDate.toString(), endDate.toString())
            .then(
                response => {
                    setTopStudents(response);
                    setIsLoading(false);
                }
            )
            .catch((error: ErrorMessage) => {
                    openNotification("error", "KLAIDA", error.message);
                }
            )
    }, [startDate, endDate]);

    const columns: ColumnsDefinition[] = [
        {
            title: 'Vieta',
            key: 'place',
            dataIndex: 'place',
            render: (text: string, record: any) => <div className={styles["table-center-column"]}>{record.place}</div>,
        },
        {
            title: 'Vardas',
            key: 'firstName',
            dataIndex: 'firstName',
            requiredSearch: true,
        },
        {
            title: 'Pavardė',
            key: 'lastName',
            dataIndex: 'lastName',
            requiredSearch: true,
        },
        {
            title: 'El. paštas',
            key: 'email',
            dataIndex: 'email',
            requiredSearch: true,
        },
        {
            title: 'Išspręsta sunkių uždavinių',
            key: 'numberOfResolvedHardTasks',
            dataIndex: 'numberOfHardTasks',
        },
        {
            title: 'Išspręsta vidutinio sunkumo uždavinių',
            key: 'numberOfResolvedMediumTasks',
            dataIndex: 'numberOfMediumTasks',
        },
        {
            title: 'Išspręsta lengvų uždavinių',
            key: 'numberOfResolvedEasyTasks',
            dataIndex: 'numberOfEasyTasks',
        }
    ];

    const onChange = (dates: any, dateStrings: [string, string]) => {
        if (dates[0] && dates[1]) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
        }
    };

    return (
        <div>
            {
                isLoading
                    ? <LoadingIcon/>
                    : (
                        <div>
                            <Row>
                                <Col lg={2} className={styles.label}>
                                    Laikotarpis:
                                </Col>
                                <Col lg={22}>
                                    <RangePicker className={styles["label-date-range"]} defaultValue={[startDate, endDate]}
                                                 onChange={onChange} placeholder={["Nuo", "Iki"]}/>
                                </Col>
                            </Row>
                            <Row>
                                <div className={styles["table-center"]}>
                                    <TableComponent
                                        data={topStudents.map((item, index) => (
                                            {
                                                ...item,
                                                key: index,
                                            }
                                        ))}
                                        columns={columns}
                                    />
                                </div>
                            </Row>
                        </div>
                    )
            }
        </div>
    );
};