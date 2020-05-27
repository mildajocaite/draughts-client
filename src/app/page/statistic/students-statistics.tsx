import React, {useEffect, useState} from 'react';
import {Card, Col, Descriptions, Form, Row, Select, Spin} from "antd";
import {StudentsStatistics, StudentTasksTypeStatistics} from "../../model/studentsStatistics";
import {userService} from "../../api/service/user-service";
import {User} from "../../model/user";
import {ErrorMessage} from "../../api/common/error-message";
import {openNotification} from "../../services/notification-service";
import {FormComponentProps} from "antd/lib/form";
import {PieCharDataType, StatisticsPieChart} from "../../components/domain/pie-chart/statistics-pie-chart";
import {statisticService} from "../../api/service/statistic-service";
import {LoadingIcon} from "../../components/common/loading-icon/loading-icon";
import styles from './students-statistics.module.scss'
import {ResolvedTasksPerDay} from "../../components/domain/bar-chart/resolved-tasks-per-day";
import {AuthService} from "../../services/auth-service";

const {Meta} = Card;

const StudentsStatisticsComponent: React.FC<FormComponentProps> =
    () => {

        const [isLoading, setIsLoading] = useState(true);
        const [students, setStudents] = useState([] as User[]);
        const [selectedStudent, setSelectedStudent] = useState();
        const [statistic, setStatistic] = useState({} as StudentsStatistics);
        const [isStudent, setIsStudent] = useState();

        useEffect(() => {
            const userRole = AuthService.getRoles();
            setIsStudent(userRole!.some(role => role.authority === "ROLE_STUDENT"));
            if (!userRole!.some(role => role.authority === "ROLE_STUDENT")) {
                setIsLoading(true);
                userService.getStudents()
                    .then(
                        response => {
                            setStudents(response);
                            setIsLoading(false);
                        }
                    )
                    .catch((error: ErrorMessage) => {
                            openNotification("error", "KLAIDA", error.message);
                            setIsLoading(false);
                        }
                    )
            } else {
                setSelectedStudent(AuthService.getEmail());
            }
        }, []);

        useEffect(() => {
            if (selectedStudent) {
                setIsLoading(true);
                statisticService.getStudentsStatistic(selectedStudent.key)
                    .then(
                        response => {
                            setStatistic(response);
                            setIsLoading(false);

                        }
                    )
                    .catch((error: ErrorMessage) => {
                            openNotification("error", "KLAIDA", error.message);
                            setIsLoading(false);
                        }
                    )
            }
        }, [selectedStudent]);

        return (
            <>
                {
                    isLoading
                        ? <LoadingIcon/>
                        : (
                            <>
                                {
                                    !isStudent && (
                                        <Row>
                                            <Select
                                                labelInValue
                                                value={selectedStudent}
                                                placeholder="Pasirinkite mokinį"
                                                notFoundContent={isLoading ? <Spin size="small"/> : null}
                                                filterOption={false}
                                                onChange={(value: any) => setSelectedStudent(value)}
                                                style={{width: '100%'}}
                                            >
                                                {
                                                    students.map((user: User, index: number) => (
                                                        <Select.Option key={index}
                                                                       value={user.email}>{`${user.lastname} ${user.firstname}`}</Select.Option>
                                                    ))
                                                }
                                            </Select>
                                        </Row>
                                    )
                                }
                                {
                                    selectedStudent && (
                                        <>
                                            <Row className={styles.row}>
                                                <Col md={24} lg={6} className={styles["summary-table"]}>
                                                    <Descriptions
                                                        layout="horizontal"
                                                        column={1}
                                                        size={"small"}
                                                        bordered>
                                                        <Descriptions.Item label="Išspręsta uždavinių">
                                                            {statistic.numberOfResolvedEasyTasks + statistic.numberOfResolvedMediumTasks + statistic.numberOfResolvedHardTasks}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item
                                                            label="Vidutinis vieno uždavinio sprendimo laikas (minutėmis)">{Math.round(statistic.numberOfResolutionTimes / 60)}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item
                                                            label="Vidutinis bandymų skaičius">{statistic.numberOfTries}
                                                        </Descriptions.Item>
                                                    </Descriptions>
                                                </Col>
                                                <Col md={24} lg={18} className={styles["bar-chart"]}>
                                                    <Card
                                                        // style={{width: 820}}
                                                        bordered={true}
                                                        cover={<ResolvedTasksPerDay email={selectedStudent.key}/>}
                                                    >
                                                        <Meta className={styles["card-body"]}
                                                              title={<span className={styles["card-title"]}>IŠSPRĘSTŲ UŽDAVINIŲ KIEKIS PER DIENĄ</span>}/>
                                                    </Card>
                                                </Col>
                                            </Row>
                                            {
                                                statistic && (statistic.numberOfResolvedEasyTasks + statistic.numberOfResolvedMediumTasks + statistic.numberOfResolvedHardTasks) !== 0 && (
                                                    <Row className={styles.row}>
                                                        <Col span={8} className={styles["pie-chart-card"]}>
                                                            <Card
                                                                className={styles.card}
                                                                bordered={true}
                                                                cover={<StatisticsPieChart
                                                                    showLabels={true}
                                                                    colors={["#088037", "#9F0606"]}
                                                                    data={[
                                                                        {
                                                                            name: "Neišspręsta",
                                                                            value: statistic.total - statistic.numberOfResolvedEasyTasks
                                                                                + statistic.numberOfResolvedMediumTasks
                                                                                + statistic.numberOfResolvedHardTasks,
                                                                            key: "total"
                                                                        },
                                                                        {
                                                                            name: "Išspręsta",
                                                                            value: statistic.numberOfResolvedEasyTasks + statistic.numberOfResolvedMediumTasks + statistic.numberOfResolvedHardTasks,
                                                                            key: "resolved"
                                                                        },
                                                                    ]}
                                                                />}
                                                            >
                                                                <Meta className={styles["card-body"]} title={<span
                                                                    className={styles["card-title"]}>IŠSPRĘSTŲ UŽDAVINIŲ KIEKIS</span>}/>
                                                            </Card>
                                                        </Col>
                                                        {
                                                            statistic.tasksTypeStatistics && (
                                                                <Col span={8} className={styles["pie-chart-card"]}>
                                                                    <Card
                                                                        className={styles.card}
                                                                        bordered={true}
                                                                        cover={<StatisticsPieChart
                                                                            colors={["#088037", "#9F0606", "#fbbc5a", "#0a0082", "#2A91BC", "#EC7D08", "#B5BFC3", "#A136DC"]}
                                                                            data={[
                                                                                ...statistic.tasksTypeStatistics.map((item: StudentTasksTypeStatistics) => {
                                                                                    return {
                                                                                        name: item.type,
                                                                                        value: item.numberOfResolvedTasks,
                                                                                        key: item.type
                                                                                    } as PieCharDataType;
                                                                                })
                                                                            ]}
                                                                        />}
                                                                    >
                                                                        <Meta className={styles["card-body"]}
                                                                              title={<span className={styles["card-title"]}>IŠSPRĘSTŲ UŽDAVINIŲ PASISKIRSTYMAS PAGAL TIPĄ</span>}/>
                                                                    </Card>
                                                                </Col>
                                                            )}
                                                        <Col span={8} className={styles["pie-chart-card"]}>
                                                            <Card
                                                                className={styles.card}
                                                                bordered={true}
                                                                cover={<StatisticsPieChart
                                                                    showLabels={true}
                                                                    colors={["#088037", "#9F0606", "#fbbc5a", "#0a0082", "#2A91BC", "#EC7D08", "#B5BFC3", "#A136DC"]}
                                                                    data={[
                                                                        {
                                                                            name: "Lengvi",
                                                                            value: statistic.numberOfResolvedEasyTasks,
                                                                            key: "easy"
                                                                        },
                                                                        {
                                                                            name: "Vidutiniai",
                                                                            value: statistic.numberOfResolvedMediumTasks,
                                                                            key: "medium"
                                                                        },
                                                                        {
                                                                            name: "Sunkūs",
                                                                            value: statistic.numberOfResolvedHardTasks,
                                                                            key: "hard"
                                                                        },
                                                                    ]}
                                                                />}
                                                            >
                                                                <Meta className={styles["card-body"]}
                                                                      title={<span className={styles["card-title"]}>IŠSPRĘSTŲ UŽDAVINIŲ PASISKIRSTYMAS PAGAL SUDĖTINGUMĄ</span>}/>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </>
                        )
                }
            </>
        )
    };

export const StudentsStatisticsWithFilter = Form.create({
    name: 'student-statistics-with-filter',
})(StudentsStatisticsComponent);