import React from 'react';
import styles from './error-message.module.scss'
import {ExclamationCircleTwoTone} from "@ant-design/icons/lib";
import {Row, Typography} from "antd";

interface OwnProps {
    message: string;
}

export const ErrorMessage: React.FC<OwnProps> = (props) => {
    return (
        <Row className={styles["error-message"]}>
            <ExclamationCircleTwoTone twoToneColor="#ff0000" className={styles.icon}/>
            <Typography.Text>{props.message}</Typography.Text>
        </Row>
    );
};

