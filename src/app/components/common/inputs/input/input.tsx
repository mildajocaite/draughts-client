import React from "react";
import {Input} from "antd";
import {WrappedFieldProps} from "redux-form";
import {ErrorMessage} from "../error-message";
import classNames from 'classnames'
import styles from './input.module.scss'

interface OwnProps {
    type: string,
}

export const renderInput = (props: WrappedFieldProps & OwnProps) => {
    const showError = props.meta.touched && props.meta.error;
    const inputClassName = classNames(
        showError && styles.error
    );

    return (
        <div>
            {
                props.type === 'password'
                    ? <Input.Password {...props.input} type={props.type} className={inputClassName}/>
                    : <Input {...props.input} type={props.type} className={inputClassName}/>
            }
            {
                showError && <ErrorMessage message={props.meta.error}/>
            }
        </div>
    );
};

