import React from 'react';
import {Col, Layout, Row} from "antd";
import Menu from "antd/lib/menu";
import {
    BookOutlined,
    DesktopOutlined,
    PieChartOutlined,
    SaveOutlined,
    TableOutlined,
    UnorderedListOutlined,
    UserOutlined
} from "@ant-design/icons/lib";
import {AuthService} from "../../../services/auth-service";
import sidebarBackgroundImage from '../../../resources/sidebar_background.jpg'
import {ReactComponent as Logo} from '../../../resources/logo.svg';
import styles from './sidebar.module.scss'
import 'antd/dist/antd.css'
import {Link} from "react-router-dom";
import {navigationService} from "../../../services/navigation-service";

const {Sider} = Layout;

interface OwnProps {
    isCollapsed: boolean;
    setIsCollapse: (state: boolean) => void;
}

export const Sidebar: React.FC<OwnProps> = (props) => {
    const {
        isCollapsed,
        setIsCollapse,
    } = props;

    const menuItems = [
        {
            title: "STATISTIKA",
            path: "/app/statistics",
            code: 'statistics',
            icon: <PieChartOutlined/>,
            accessibleForStudent: true,
            accessibleForTeacher: true,
        },
        {
            title: "TIESIOGINĖS TRANSLIACIJOS",
            path: "/app/live",
            code: 'live',
            icon: <DesktopOutlined/>,
            accessibleForStudent: false,
            accessibleForTeacher: true,
        },
        {
            title: "NAUDOTOJAI",
            path: "/app/user",
            code: 'users',
            icon: <UserOutlined/>,
            accessibleForStudent: false,
            accessibleForTeacher: true,
        },
        {
            title: "ŠAŠKIŲ LENTOS",
            path: "/app/board",
            code: 'boards',
            icon: <TableOutlined/>,
            accessibleForStudent: false,
            accessibleForTeacher: true,
        },
        {
            title: "ĮRAŠYTI PARTIJĄ",
            path: "/app/recording",
            code: 'recordings',
            icon: <SaveOutlined/>,
            accessibleForStudent: true,
            accessibleForTeacher: true,
        },
        {
            title: "PARTIJOS",
            path: "/app/games",
            code: 'games',
            icon: <BookOutlined/>,
            accessibleForStudent: true,
            accessibleForTeacher: true,
        },
        {
            title: "UŽDAVINIAI",
            path: "/app/tasks",
            code: '/app/tasks',
            icon: <UnorderedListOutlined/>,
            accessibleForStudent: false,
            accessibleForTeacher: true,
        },
        {
            title: "UŽDAVINIAI",
            path: "/app/tasks-student",
            code: 'tasks-student',
            icon: <UnorderedListOutlined/>,
            accessibleForStudent: true,
            accessibleForTeacher: false,
        },
    ];

    const userRole = AuthService.getRoles();

    if (!userRole) {
        return null;
    }

    const menuItemsToDisplay = menuItems.filter(item => (item.accessibleForStudent && userRole.some(role => role.authority === "ROLE_STUDENT"))
        || (item.accessibleForTeacher && userRole.some(role => role.authority === "ROLE_COACH")));

    const sidebarBackground = {
        backgroundImage: "url(" + sidebarBackgroundImage + ")"
    };

    const handleBreakPointChange = (state: boolean) => {
        setIsCollapse(state);
    };

    return (
        <Sider
            style={sidebarBackground}
            className={styles["sidebar-container"]}
            trigger={null}
            collapsible collapsed={isCollapsed}
            breakpoint="sm"
            collapsedWidth='0'
            width={250}
            onBreakpoint={handleBreakPointChange}
        >
            <Row align="middle">
                <Col span={6}>
                    <Logo width={57} height={65}/>
                </Col>
                <Col span={18}>
                    <div className={styles["logo-text"]}>
                        MOKYMOSI IR MOKYMO ŽAISTI ŠAŠKĖMIS SISTEMA
                    </div>
                </Col>
            </Row>
            <Menu className={styles["menu-container"]} theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {
                    menuItemsToDisplay.map(menuItem => (
                        <Menu.Item
                            key={menuItem.code}
                            className={navigationService.getCurrentPage().includes(menuItem.path) ? styles["active-menu"] : styles["menu"]}
                        >
                            <Link to={menuItem.path}>
                                {menuItem.icon}
                                <span>{menuItem.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
        </Sider>
    );
};

