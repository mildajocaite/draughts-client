import React, {useEffect, useState} from "react";
import {Form, Row} from "antd";
import {Field, getFormValues, InjectedFormProps, reduxForm, WrappedFieldProps} from "redux-form";
import {User} from "../../../model/user";
import styles from "./edit-user-form.module.scss";
import {boardService} from "../../../api/service/board-service";
import {openNotification} from "../../../services/notification-service";
import {navigationService} from "../../../services/navigation-service";
import {validate} from '../validation'
import {renderPhoneInput} from "../../../components/common/inputs/phone-input/phone-input";
import {renderInput} from "../../../components/common/inputs/input/input";
import {
    renderSelectWithSearch,
    SelectOption
} from "../../../components/common/inputs/select-with-search/select-with-search";
import {renderSelect} from "../../../components/common/inputs/select/select";
import {connect} from "react-redux";
import {RootState} from "../../../redux/state/root-state";
import {ErrorMessage} from "../../../api/common/error-message";
import {SubmitButton} from "../../../components/common/buttons/submit-button/submit-button";
import {CancelButton} from "../../../components/common/buttons/cancel-button/cancel-button";

type Props = InjectedFormProps<User>;

const EditUserFormComponent: React.FC<Props> =
    (props) => {

        const {
            handleSubmit,
            submitting,
            initialValues,
        } = props;

        const [boards, setBoards] = useState([] as SelectOption[]);
        const [role, setRole] = useState(initialValues.role);

        useEffect(() => {
            boardService.getBoards()
                .then(
                    response => {
                        setBoards(response.map(board => {
                            return {
                                value: board.code,
                                text: board.name + " | " + board.code
                            }
                        }));
                    }
                )
                .catch((error: ErrorMessage) => {
                        navigationService.redirectToUsersList();
                        openNotification("error", "KLAIDA", error.message);
                    }
                );
        }, []);

        return (
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Row>
                    El. paštas
                </Row>
                <Row className={styles["input-row"]}>
                    <Field
                        name="email"
                        key="email"
                        type="email"
                        value={initialValues.email}
                        component={renderInput}
                    />
                </Row>
                <Row>
                    Vardas
                </Row>
                <Row className={styles["input-row"]}>
                    <Field
                        name="firstname"
                        key="firstname"
                        value={initialValues.firstname}
                        component={renderInput}
                    />
                </Row>
                <Row>
                    Pavardė
                </Row>
                <Row className={styles["input-row"]}>
                    <Field
                        name="lastname"
                        key="lastname"
                        value={initialValues.lastname}
                        component={renderInput}
                    />
                </Row>
                <Row>
                    Telefono numeris
                </Row>
                <Row className={styles["input-row"]}>
                    <Field
                        name="phone"
                        key="phone"
                        value={initialValues.phone}
                        component={renderPhoneInput}
                    />
                </Row>

                <Row>
                    Naudotojo tipas
                </Row>
                <Row className={styles["input-row"]}>
                    <Field
                        name="role"
                        key="role"
                        type="select"
                        value={initialValues.role}
                        component={(field: WrappedFieldProps) => renderSelect({
                            ...field,
                            input: {
                                ...field.input,
                                onChange: (value: any) => {
                                    setRole(value);
                                    field.input.onChange(value);
                                },
                            },
                            optionsToSelect: [
                                {
                                    value: "ROLE_STUDENT",
                                    text: "MOKINYS",
                                },
                                {
                                    value: "ROLE_COACH",
                                    text: "TRENERIS",
                                }
                            ],
                        })}/>
                </Row>
                {role==="ROLE_STUDENT" && (
                    <>
                        <Row>
                            Interaktyvi lenta
                        </Row>
                        <Row className={styles["input-row"]}>
                            <Field
                                name="boardCode"
                                key="boardCode"
                                component={(field: WrappedFieldProps) => renderSelectWithSearch({
                                    ...field,
                                    optionsToSelect: boards,
                                    allowClear: true,
                                })}
                            />
                        </Row>
                    </>
                )}
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
                    text="Atšaukti"
                    onClick={navigationService.redirectToUsersList}
                />
            </Form>

        );
    };

const mapStateToProps = (
    state: RootState,
) => {
    return {
        formValues: getFormValues('edit-user')(state)
    }
};

const EditFormWithValues = connect(
    mapStateToProps,
    null,
)(EditUserFormComponent);

const EditUserForm = reduxForm<User>({
    form: 'edit-user',
    validate,
})(EditFormWithValues);

export {EditUserForm}