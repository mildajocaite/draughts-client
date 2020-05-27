import React from 'react'
import {Field, Form, InjectedFormProps, reduxForm} from 'redux-form'
import {LoginFormModel} from "./model/LoginFormModel";
import Button from "antd/lib/button";
import {Input} from "antd";
import styles from './login-form.module.scss'
import {LockOutlined, UserOutlined} from "@ant-design/icons/lib";

type Props = InjectedFormProps<LoginFormModel>;


class LoginFormComponent extends React.Component<Props> {
    public render(): React.ReactNode {
        const {
            handleSubmit,
            submitting,
        } = this.props;

        const renderEmailField = (field: any) => (
            <Input
                prefix={<LockOutlined/>}
                placeholder="El. paštas"
                type="email"
                className={styles.field}
                {...field.input}
            />
        );

        const renderPasswordField = (field: any) => (
            <Input.Password
                prefix={<UserOutlined/>}
                type="password"
                placeholder="Slaptažodis"
                className={styles.field}
                {...field.input}
            />
        );

        return (
            <Form onSubmit={handleSubmit}>
                <Field
                    name="email"
                    component={renderEmailField}
                />
                <Field
                    name="password"
                    component={renderPasswordField}
                />
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    className={styles.button}
                >
                    Prisijungti
                </Button>
            </Form>
        );
    };
}

const LoginForm = reduxForm<LoginFormModel>({
    form: 'login'
})(LoginFormComponent);

export {LoginForm}