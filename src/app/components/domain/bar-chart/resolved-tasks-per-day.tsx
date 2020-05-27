import React, {useEffect, useState} from 'react';
import {Col, DatePicker, Row} from 'antd';
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';
import moment from 'moment'
import {statisticService} from "../../../api/service/statistic-service";
import {openNotification} from "../../../services/notification-service";
import {ResolvedTasksPerDay as ResolvedTasksPerDayModel} from "./model/resolved-tasks-per-day";
import styles from "./resolved-tasks-per-day.module.scss";
import {ErrorMessage} from "../../../api/common/error-message";
import {LoadingIcon} from "../../common/loading-icon/loading-icon";

const {RangePicker} = DatePicker;

interface OwnProps {
    email: string;
}

export const ResolvedTasksPerDay: React.FC<OwnProps> =
    (props) => {
        const [isLoading, setIsLoading] = useState(true);
        const [data, setData] = useState([] as ResolvedTasksPerDayModel[]);
        const [startDate, setStartDate] = useState(moment().startOf('month'));
        const [endDate, setEndDate] = useState(moment().endOf('month'));

        useEffect(() => {
            setIsLoading(true);
            statisticService.getResolvedTasksPerDay(startDate.toString(), endDate.toString(), props.email)
                .then(
                    response => {
                        setData(response);
                        setIsLoading(false);
                    }
                )
                .catch((error: ErrorMessage) => {
                        openNotification("error", "KLAIDA", error.message);
                    }
                )
        }, [startDate, endDate, props.email]);

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
                        :
                        <div>
                            <Row className={styles.filter}>
                                <Col lg={2}/>
                                <Col lg={2} className={styles.label}>
                                    Laikotarpis:
                                </Col>
                                <Col lg={19}>
                                    <RangePicker className={styles["label-date-range"]}
                                                 defaultValue={[startDate, endDate]}
                                                 onChange={onChange} placeholder={["Nuo", "Iki"]}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className={styles['bar-chart-container']}>
                                    < BarChart
                                        width={750}
                                        height={300}
                                        data={data}
                                        margin={{
                                            top: 5, right: 30, left: 20, bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="resolvedDate"/>
                                        <YAxis allowDecimals={false}/>
                                        <Tooltip/>
                                        <Bar dataKey="numberOfResolvedTasks" name="Išspręsta uždavinių" fill="#088037"/>
                                    </BarChart>
                                </Col>
                            </Row>
                        </div>
                }
            </div>
        )
    };