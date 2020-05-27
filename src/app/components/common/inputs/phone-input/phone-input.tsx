import React from "react";
import {Col, Input, Row, Select} from "antd";
import {WrappedFieldProps} from "redux-form";
import {ErrorMessage} from "../error-message";
import classNames from "classnames";
import styles from "./phone-input.module.scss";

interface OwnProps {
    type: string,
}

export const renderPhoneInput = (props: WrappedFieldProps & OwnProps) => {
    const showError = props.meta.touched && props.meta.error;
    const phoneInputClassName = classNames(
        showError && styles.error
    );

    return (
        <div>
            <Row>
                <Col span={7}>
                    <Select defaultValue="+3706">
                        <Select.Option value="+3706">+3706</Select.Option>
                    </Select>
                </Col>
                <Col span={1}/>
                <Col span={16}>
                    <Input {...props.input} type={props.type} className={phoneInputClassName}/>
                </Col>
            </Row>
            {
                props.meta.touched && (props.meta.error && <ErrorMessage message={props.meta.error}/>)
            }
        </div>
    );
};

