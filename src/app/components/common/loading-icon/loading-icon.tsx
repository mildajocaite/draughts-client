import React from "react";
import {Icon} from "antd";
import styles from './loading-icon.module.scss'

export const LoadingIcon = () => {
    return (
        <Icon className={styles["loading-icon"]} type="loading"/>
    );
};

