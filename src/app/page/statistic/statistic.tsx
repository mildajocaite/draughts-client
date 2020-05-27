import React from 'react';
import Tabs from "antd/lib/tabs";
import {TopTasks} from "../../components/domain/top-tasks/top-tasks";
import {Card} from "antd";
import {TopStudents} from "../../components/domain/top-students/top-students";
import {AuthService} from "../../services/auth-service";
import {StudentsStatisticsWithFilter} from "./students-statistics";

const {TabPane} = Tabs;

export const Statistics: React.FC<{}> =
    () => {
        const userRole = AuthService.getRoles();

        if (!userRole) {
            return null;
        }

        return (
            <Card title="STATISTIKA" style={{margin: '20px'}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Daugiausia uždavinių išsprendę mokiniai" key="topStudents">
                        <TopStudents/>
                    </TabPane>
                    <TabPane
                        tab={userRole.some(role => role.authority === "ROLE_STUDENT")
                            ? "Mano statistiniai duomenys"
                            : "Mokinių statistiniai duomenys"}
                        key="studentStatistics"
                    >
                        <StudentsStatisticsWithFilter/>
                    </TabPane>
                    <TabPane tab="10 populiariausių uždavinių" key="top10MostPopular">
                        <TopTasks/>
                    </TabPane>
                </Tabs>
            </Card>
        )
    };
