import React, {useEffect, useState} from "react";
import {Form, Row} from "antd";
import {Field, InjectedFormProps, reduxForm, WrappedFieldProps} from "redux-form";
import styles from "./create-user-form.module.scss";
import {boardService} from "../../../api/service/board-service";
import {openNotification} from "../../../services/notification-service";
import {navigationService} from "../../../services/navigation-service";
import {validateUserCreation} from '../validation'
import {renderPhoneInput} from "../../../components/common/inputs/phone-input/phone-input";
import {renderInput} from "../../../components/common/inputs/input/input";
import {
    renderSelectWithSearch,
    SelectOption
} from "../../../components/common/inputs/select-with-search/select-with-search";
import {renderSelect} from "../../../components/common/inputs/select/select";
import {ErrorMessage} from "../../../api/common/error-message";
import {SubmitButton} from "../../../components/common/buttons/submit-button/submit-button";
import {CancelButton} from "../../../components/common/buttons/cancel-button/cancel-button";
import {LoadingIcon} from "../../../components/common/loading-icon/loading-icon";
import {userService} from "../../../api/service/user-service";
import {CreateUserModel} from "./create-user-model";

type Props = InjectedFormProps<CreateUserModel>;

const CreateUserFormComponent: React.FC<Props> =
    (props) => {

        const {
            handleSubmit,
            submitting,
        } = props;

        const [boards, setBoards] = useState([] as SelectOption[]);
        const [coaches, setCoaches] = useState([] as SelectOption[]);
        const [isLoading, setIsLoading] = useState(true);
        const [role, setRole] = useState("ROLE_STUDENT");

        useEffect(() => {
            setIsLoading(true);
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
            userService.getCoaches()
                .then(
                    response => {
                        setCoaches(response.map(user => {
                            return {
                                value: user.email,
                                text: user.lastname + " | " + user.firstname
                            }
                        }));
                        setIsLoading(false);
                    }
                )
                .catch((error: ErrorMessage) => {
                        navigationService.redirectToUsersList();
                        openNotification("error", "KLAIDA", error.message);
                    }
                );
        }, []);

        return (
            isLoading
                ? <LoadingIcon/>
                : (
                    <Form onSubmit={handleSubmit} className={styles.form}>
                        <Row>
                            El. paštas
                        </Row>
                        <Row className={styles["input-row"]}>
                            <Field
                                name="email"
                                key="email"
                                type="email"
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
                                component={renderInput}
                            />
                        </Row>
                        <Row>
                            Slaptažodis
                        </Row>
                        <Row className={styles["input-row"]}>
                            <Field
                                name="password"
                                key="password"
                                type="password"
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
                                    Treneris
                                </Row>
                                <Row className={styles["input-row"]}>
                                    <Field
                                        name="coach"
                                        key="coach"
                                        component={(field: WrappedFieldProps) => renderSelectWithSearch({
                                            ...field,
                                            optionsToSelect: coaches,
                                        })}
                                    />
                                </Row>
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
                )
        );
    };


const CreateUserForm = reduxForm<CreateUserModel>({
    form: 'create-user',
    validate: validateUserCreation,
})(CreateUserFormComponent);

export {CreateUserForm}