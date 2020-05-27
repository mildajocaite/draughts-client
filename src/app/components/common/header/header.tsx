import React from 'react';
import {Col, Dropdown, Icon, Layout, Row} from "antd";
import Menu from "antd/lib/menu";
import styles from './header.module.scss'
import {AuthService} from "../../../services/auth-service";

const {Header} = Layout;

interface OwnProps {
    isCollapsed: boolean;
    onCollapseClick: () => void;
}

export const HeaderComponent: React.FC<OwnProps> = (props) => {
    const {
        isCollapsed,
        onCollapseClick,
    } = props;


    const logout = () => {
        AuthService.logout();
    };

    return (
        <Header className={styles.header}>
            <Row>
                <Col md={8} span={8}>
                    <Icon className={styles["hamburger-menu-icon"]}
                          type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
                          onClick={onCollapseClick}
                    />
                </Col>
                <Col className={styles.email} md={16} span={16}>
                    <p className={styles['email-text']}>{AuthService.getEmail()}</p>
                    <Dropdown trigger={['click']} overlay={
                        <Menu>
                            <Menu.Item key="1" onClick={logout}>ATSIJUNGTI</Menu.Item>
                        </Menu>}>
                        <Icon type="logout" className={styles["logout-icon"]}/>
                    </Dropdown>
                </Col>
            </Row>
        </Header>
    );
};

