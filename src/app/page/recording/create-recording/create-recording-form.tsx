import React, {useEffect, useState} from "react";
import {Form, Row} from "antd";
import {Field, InjectedFormProps, reduxForm, WrappedFieldProps} from "redux-form";
import styles from "./create-recording-form.module.scss";
import {boardService} from "../../../api/service/board-service";
import {openNotification} from "../../../services/notification-service";
import {navigationService} from "../../../services/navigation-service";
import {validate} from '../validation'
import {
    renderSelectWithSearch,
    SelectOption
} from "../../../components/common/inputs/select-with-search/select-with-search";
import {userService} from "../../../api/service/user-service";
import {AuthService} from "../../../services/auth-service";
import {ErrorMessage} from "../../../api/common/error-message";
import {LoadingIcon} from "../../../components/common/loading-icon/loading-icon";
import {SubmitButton} from "../../../components/common/buttons/submit-button/submit-button";
import {CancelButton} from "../../../components/common/buttons/cancel-button/cancel-button";
import {Game} from "../../../model/game";

type Props = InjectedFormProps<Game>;

const CreateRecordingFormComponent: React.FC<Props> =
    (props) => {

        const {
            handleSubmit,
            submitting,
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
                                            name="boardCode"
                                            key="boardCode"
                                            component={(field: WrappedFieldProps) => renderSelectWithSearch({
                                                ...field,
                                                optionsToSelect: boards,
                                            })}
                                        />
                                    </Row>
                                </>
                            )
                        }
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
                            onClick={navigationService.redirectToRecordingsList}
                        />
                    </Form>
                )
        );
    };


const CreateRecordingForm = reduxForm<Game>({
    form: 'create-recording',
    validate,
})(CreateRecordingFormComponent);

export {CreateRecordingForm}