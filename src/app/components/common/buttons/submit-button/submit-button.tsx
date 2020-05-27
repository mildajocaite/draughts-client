import React from "react";
import {Button} from "antd";
import styles from './submit-button.module.scss'
import {ButtonProps} from "antd/es/button";
import classNames from 'classnames'

interface OwnProps {
    text: string,
}

export const SubmitButton = (props: ButtonProps & OwnProps) => {
    const {
        text,
        className,
        ...rest
    } = props;

    const buttonClassName = classNames(
        className,
        styles["submit-button"],
    );

    return (
        <Button
            className={buttonClassName}
            {...rest}
        >
            {text}
        </Button>
    );
};

