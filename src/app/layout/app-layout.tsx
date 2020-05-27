import React, {useState} from 'react';
import {Sidebar} from "../components/common/sidebar/sidebar";
import {Layout} from "antd";
import {Switch} from "react-router-dom";
import {HeaderComponent} from "../components/common/header/header";
import {Statistics} from "../page/statistic/statistic";
import {PrivateRouting} from "../api/common/PrivateRouting";
import {LiveGames} from "../page/live/live-games";
import {UsersList} from "../page/users/users-list";
import {CreateUser} from "../page/users/create-user/create-user";
import {EditUser} from "../page/users/edit-user/edit-user";
import {BoardList} from "../page/board/board-list";
import {CreateBoard} from "../page/board/create-board/create-board";
import {EditBoard} from "../page/board/edit-board/edit-board";
import {RecordingsList} from "../page/recording/recordings-list";
import {CreateRecording} from "../page/recording/create-recording/create-recording";
import {EditRecording} from "../page/recording/edit-recording/edit-recording";
import {GamesList} from "../page/games/games-list";
import {TasksList} from "../page/task/admin/tasks-list";
import {CreateTask} from "../page/task/admin/create-task/create-task";
import {TasksListForStudent} from "../page/task/user/tasks-list";
import {ReviewTaskForStudent} from "../page/task/user/review/review-task";
import {SolveTask} from "../page/task/user/solve/solve-task";
import {ReviewTask} from "../page/task/admin/review-task/review-task";

export const AppLayout: React.FC = () => {

    const [collapsed, setIsCollapsed] = useState(false);

    const handleCollapsedClick = () => {
        setIsCollapsed(!collapsed);
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sidebar
                isCollapsed={collapsed}
                setIsCollapse={setIsCollapsed}
            />
            <Layout>
                <HeaderComponent isCollapsed={collapsed} onCollapseClick={handleCollapsedClick}/>
                <Switch>
                    <PrivateRouting exact path="/app/statistics" component={Statistics}/>
                    <PrivateRouting exact path="/app/live" component={LiveGames}/>
                    <PrivateRouting exact path="/app/user" component={UsersList}/>
                    <PrivateRouting exact path="/app/user/create" component={CreateUser}/>
                    <PrivateRouting exact path="/app/user/:id" component={EditUser}/>
                    <PrivateRouting exact path="/app/board" component={BoardList}/>
                    <PrivateRouting exact path="/app/board/create" component={CreateBoard}/>
                    <PrivateRouting exact path="/app/board/:id" component={EditBoard}/>
                    <PrivateRouting exact path="/app/recording" component={RecordingsList}/>
                    <PrivateRouting exact path="/app/recording/create" component={CreateRecording}/>
                    <PrivateRouting exact path="/app/recording/:id" component={EditRecording}/>
                    <PrivateRouting exact path="/app/games" component={GamesList}/>
                    <PrivateRouting exact path="/app/tasks" component={TasksList}/>
                    <PrivateRouting exact path="/app/task/create" component={CreateTask}/>
                    <PrivateRouting exact path="/app/task/review/:id" component={ReviewTask}/>
                    <PrivateRouting exact path="/app/tasks-student" component={TasksListForStudent}/>
                    <PrivateRouting exact path="/app/tasks-student/review/:id" component={ReviewTaskForStudent}/>
                    <PrivateRouting exact path="/app/tasks-student/solve/:id" component={SolveTask}/>
                </Switch>
            </Layout>
        </Layout>
    );
};
