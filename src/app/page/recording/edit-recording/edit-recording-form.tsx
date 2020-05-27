import React, {useEffect, useState} from "react";
import {Form, Row} from "antd";
import {Field, InjectedFormProps, reduxForm, WrappedFieldProps} from "redux-form";
import styles from "./edit-recording-form.module.scss";
import {boardService} from "../../../api/service/board-service";
import {openNotification} from "../../../services/notification-service";
import {navigationService} from "../../../services/navigation-service";
import {
    renderSelectWithSearch,
    SelectOption
} from "../../../components/common/inputs/select-with-search/select-with-search";
import {userService} from "../../../api/service/user-service";
import {AuthService} from "../../../services/auth-service";
import {renderSelect} from "../../../components/common/inputs/select/select";
import {SubmitButton} from "../../../components/common/buttons/submit-button/submit-button";
import {CancelButton} from "../../../components/common/buttons/cancel-button/cancel-button";
import {LoadingIcon} from "../../../components/common/loading-icon/loading-icon";
import {ErrorMessage} from "../../../api/common/error-message";
import {UpdateRecording} from "../../../model/update-recording";

type Props = InjectedFormProps<UpdateRecording>;

const EditRecordingFormComponent: React.FC<Props> =
    (props) => {

        const {
            handleSubmit,
            submitting,
            initialValues,
        } = props;

        const [boards, setBoards] = useState([] as SelectOption[]);
        const [users, setUsers] = useState([] as SelectOption[]);
        const [isLoading, setIsLoading] = useState(true);

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
                        navigationService.redirectToRecordingsList();
                        openNotification("error", "KLAIDA", error.message);
                    }
                );

            userService.getUsers()
                .then(
                    response => {
                        setUsers(response.map(user => {
                            return {
                                value: user.email,
                                text: user.lastname + " " + user.firstname + " | " + user.email
                            }
                        }));
                        setIsLoading(false);
                    }
                )
                .catch((error: ErrorMessage) => {
                        navigationService.redirectToRecordingsList();
                        openNotification("error", "KLAIDA", error.message);
                    }
                )
        }, []);

        return (
            isLoading
                ? <LoadingIcon/>
                : (
                    <Form onSubmit={handleSubmit} className={styles.form}>
                        <Row>
                            Žaidėjas baltais
                        </Row>
                        <Row className={styles["input-row"]}>
                            <Field
                                name="player1"
                                key="player1"
                                value={initialValues.player1}
                                component={(field: WrappedFieldProps) => renderSelectWithSearch({
                                    ...field,
                                    optionsToSelect: users,
                                })}
                            />
                        </Row>
                        <Row>
                            Žaidėjas juodais
                        </Row>
                        <Row className={styles["input-row"]}>
                            <Field
                                name="player2"
                                key="player2"
                                value={initialValues.player2}
                                component={(field: WrappedFieldProps) => renderSelectWithSearch({
                                    ...field,
                                    optionsToSelect: users,
                                })}
                            />
                        </Row>
                        {
                            AuthService.getRoles()!.some(role => role.authority === "ROLE_COACH") &&
                            (
                                <>
                                    <Row>
                                        Šaškių lenta
                                    </Row>
                                    < Row className={styles["input-row"]}>
                                        <Field
                                            name="board"
                                            key="board"
                                            value={initialValues.board}
                                            component={(field: WrappedFieldProps) => renderSelectWithSearch({
                                                ...field,
                                                optionsToSelect: boards,
                                            })}
                                        />
                                    </Row>
                                </>
                            )
                        }
                        <Row>
                            Rezultatas
                        </Row>
                        <Row className={styles["input-row"]}>
                            <Field
                                name="result"
                                key="result"
                                type="result"
                                component={(field: WrappedFieldProps) => renderSelect({
                                    ...field,
                                    optionsToSelect: [
                                        {
                                            value: "2-0",
                                            text: "2-0",
                                        },
                                        {
                                            value: "0-2",
                                            text: "0-2",
                                        },
                                        {
                                            value: "1-1",
                                            text: "1-1",
                                        }
                                    ],
                                })}/>
                        </Row>
                        <SubmitButton
                            type="primary"
                            className={styles['submit-button']}
                            htmlType="submit"
                            text="Išsaugoti"
                        />
                        <CancelButton
                            loading={submitting}
                            type="primary"
                            className={styles['cancel-button']}
                            htmlType="submit"
                            text="Atšaukti"
                            onClick={navigationService.redirectToRecordingsList}
                        />
                    </Form>
                )
        );
    };


const EditRecordingForm = reduxForm<UpdateRecording>({
    form: 'edit-recording',
})(EditRecordingFormComponent);

export {EditRecordingForm}