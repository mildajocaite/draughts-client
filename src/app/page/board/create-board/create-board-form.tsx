import React from "react";
import {Form, Row} from "antd";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import styles from "./create-board-form.module.scss";
import {renderInput} from "../../../components/common/inputs/input/input";
import {validate} from "../validations";
import {Board} from "../../../model/board";
import {SubmitButton} from "../../../components/common/buttons/submit-button/submit-button";
import {CancelButton} from "../../../components/common/buttons/cancel-button/cancel-button";
import {navigationService} from "../../../services/navigation-service";

type Props = InjectedFormProps<Board>;

const CreateBoardFormComponent: React.FC<Props> =
    (props) => {

        const {
            handleSubmit,
            submitting,
        } = props;


        return (
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Row>
                    Pavadinimas
                </Row>
                <Row className={styles["input-row"]}>
                    <Field
                        name="name"
                        key="name"
                        type="name"
                        component={renderInput}
                    />
                </Row>
                <Row>
                    Kodas
                </Row>
                <Row className={styles["input-row"]}>
                    <Field
                        name="code"
                        key="code"
                        component={renderInput}
                    />
                </Row>
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
                    onClick={navigationService.redirectToBoardsList}
                />
            </Form>
        );
    };


const CreateBoardForm = reduxForm<Board>({
    form: 'create-board',
    validate,
})(CreateBoardFormComponent);

export {CreateBoardForm}