import React from "react";
import {Select} from "antd";
import {ErrorMessage} from "../error-message";
import {WrappedFieldProps} from "redux-form";
import classNames from "classnames";
import styles from "./select.module.scss";

interface SelectOption {
    value: string,
    text: string
}

interface OwnProps {
    optionsToSelect: SelectOption[],
    allowClear?: boolean,
}

export const renderSelect = (props: WrappedFieldProps & OwnProps) => {
    const showError = props.meta.touched && props.meta.error;
    const selectClassName = classNames(
        showError && styles.error
    );

    return (
        <div>
            <Select
                value={props.input.value}
                onChange={props.input.onChange}
                onBlur={props.input.onBlur}
                defaultActiveFirstOption={true}
                className={selectClassName}
                allowClear={props.allowClear}
            >
                {
                    props.optionsToSelect.map((optionToSelect: SelectOption, index: number) => (
                        <Select.Option key={index} value={optionToSelect.value}>{optionToSelect.text}</Select.Option>
                    ))
                }
            </Select>
            {
                props.meta.touched && (props.meta.error && <ErrorMessage message={props.meta.error}/>)
            }
        </div>
    );
};
