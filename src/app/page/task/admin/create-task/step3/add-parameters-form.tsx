import React from "react";
import {Col, Form, Row} from "antd";
import {Field, InjectedFormProps, reduxForm, WrappedFieldProps} from "redux-form";
import {TaskParameters} from "../../../model/task-parameters";
import styles from "./add-parameters-forn.module.scss";
import {renderSelect} from "../../../../../components/common/inputs/select/select";
import {SubmitButton} from "../../../../../components/common/buttons/submit-button/submit-button";
import {CancelButton} from "../../../../../components/common/buttons/cancel-button/cancel-button";

interface OwnProps {
    onPreviousClick: () => void;
}

type Props = InjectedFormProps<TaskParameters, OwnProps> & OwnProps;

const AddParametersFormComponent: React.FC<Props> =
    (props) => {

        const {
            handleSubmit,
            submitting,
            initialValues,
        } = props;

        return (
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Row justify="center">
                    <Row className={styles["form-row"]}>
                        <Row>
                            Uždavinio sąlyga
                        </Row>
                        <Row className={styles["input-row"]}>
                            <Field
                                name="taskResult"
                                key="taskResult"
                                type="select"
                                value={initialValues.taskResult}
                                component={(field: WrappedFieldProps) => renderSelect({
                                    ...field,
                                    optionsToSelect: [
                                        {
                                            value: "WHITES_START_AND_WIN",
                                            text: "Baltieji pradeda ir laimi",
                                        },
                                        {
                                            value: "DRAW",
                                            text: "Lygiosios",
                                        },
                                    ],
                                })}/>
                        </Row>
                        <Row>
                            Uždavinio sunkumas
                        </Row>
                        <Row className={styles["input-row"]}>
                            <Field
                                name="taskComplexity"
                                key="taskComplexity"
                                type="select"
                                value={initialValues.taskComplexity}
                                component={(field: WrappedFieldProps) => renderSelect({
                                    ...field,
                                    optionsToSelect: [
                                        {
                                            value: "EASY",
                                            text: "Lengvas",
                                        },
                                        {
                                            value: "MEDIUM",
                                            text: "Vidutinis",
                                        },
                                        {
                                            value: "HARD",
                                            text: "Sunkus",
                                        }
                                    ],
                                })}/>
                        </Row>
                        <Row>
                            Uždavinio tipas
                        </Row>
                        <Row className={styles["input-row"]}>
                            <Field
                                name="taskType"
                                key="taskType"
                                type="select"
                                value={initialValues.taskType}
                                component={(field: WrappedFieldProps) => renderSelect({
                                    ...field,
                                    optionsToSelect: [
                                        {
                                            value: "KOMBINACIJA",
                                            text: "Kombinacija",
                                        },
                                        {
                                            value: "ZIRKLES",
                                            text: "Žirklės",
                                        },
                                        {
                                            value: "ENDSPILIS",
                                            text: "Endšpilis",
                                        },
                                        {
                                            value: "OPOZICIJA",
                                            text: "Opozicija",
                                        },
                                        {
                                            value: "KILPA",
                                            text: "Kilpa",
                                        },
                                        {
                                            value: "UŽDARYMAS",
                                            text: "Uždarymas",
                                        },
                                        {
                                            value: "ATKIRTIMAS",
                                            text: "Atkirtimas",
                                        },
                                        {
                                            value: "KITA",
                                            text: "Kita",
                                        }
                                    ],
                                })}/>
                        </Row>
                    </Row>
                </Row>
                <Row justify="end">
                    <Col span={24} className={styles['buttons-row']}>
                        <SubmitButton
                            loading={submitting}
                            type="primary"
                            className={styles['submit-button']}
                            htmlType="submit"
                            text="Išsaugoti"
                        />
                        <CancelButton
                            type="primary"
                            className={styles['cancel-button']}
                            htmlType="submit"
                            text="Ankstesnis žingsnis"
                            onClick={props.onPreviousClick}
                        />
                    </Col>
                </Row>
            </Form>
        );
    };


const AddParametersForm = reduxForm<TaskParameters, OwnProps>({
    form: 'create-task',
})(AddParametersFormComponent);

export {AddParametersForm}