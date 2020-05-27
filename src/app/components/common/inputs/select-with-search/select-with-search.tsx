import React from "react";
import {Select} from "antd";
import {WrappedFieldProps} from "redux-form";
import {ErrorMessage} from "../error-message";
import classNames from "classnames";
import styles from "../select/select.module.scss";

export interface SelectOption {
    value: string,
    text: string
}

interface OwnProps {
    optionsToSelect: SelectOption[],
    allowClear?: boolean,
}

export const renderSelectWithSearch = (props: WrappedFieldProps & OwnProps) => {
    const showError = props.meta.touched && props.meta.error;
    const selectClassName = classNames(
        showError && styles.error
    );

    return (
        <div>
            <Select
                showSearch
                className={selectClassName}
                onChange={props.input.onChange}
                onBlur={props.input.onBlur}
                optionFilterProp="children"
                value={props.input.value}
                allowClear={props.allowClear}
                filterOption={(inputValue, option) => {
                    return option.props.children != null ? option.props.children.toString().toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 : false;
                }}
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

