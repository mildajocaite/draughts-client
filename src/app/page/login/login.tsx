import React from "react";
import {authorizeUser} from "./redux/auth-action-creator";
import {RootActions} from "../../redux/actions/root-actions";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {LoginForm} from './login-form'
import background from '../../resources/login-background.jpg'
import usersIcon from '../../resources/users.png'

import styles from './login.module.scss'
import {Col, Row} from "antd";
import {RootState} from "../../redux/state/root-state";
import Alert from "antd/lib/alert";


interface StateProps {
    isWrongCredentials: boolean;
    failureReason?: string;
}

interface DispatchProps {
    submitLogin: typeof authorizeUser;
}

type Props = DispatchProps & StateProps;

const LoginPageComponent: React.FC<Props> =
    (props) => {

        const {
            submitLogin,
            isWrongCredentials,
            failureReason,
        } = props;

        return (
            <div style={{backgroundImage: `url(${background})`}} className={styles["login-main"]}>
                <Row className={styles['login-container']}>
                    <Col md={8} sm={6} xs={0}/>
                    <Col md={8} sm={12} xs={24} className={styles["login-box"]}>
                        <div>
                            <img className={styles['login-picture']} src={usersIcon} alt="users"/>
                            <h2 className={styles["login-name"]}>PRISIJUNGIMAS</h2>
                            {isWrongCredentials ?
                                (
                                    <Alert message="KLAIDA"
                                           type="error"
                                           description="Netinkami prisijungimo duomenys."
                                           showIcon/>
                                ) :
                                (
                                    <></>
                                )
                            }
                            {!isWrongCredentials && failureReason ?
                                (
                                    <Alert message="KLAIDA"
                                           type="error"
                                           description="Sistemos klaida."
                                           showIcon/>
                                ) :
                                (
                                    <></>
                                )
                            }
                            <LoginForm
                                form="login"
                                onSubmit={submitLogin}
                            />
                        </div>
                    </Col>
                    <Col md={8} sm={6} xs={0}/>
                </Row>

            </div>
        );
    };

const mapStateToProps = (rootState: RootState): StateProps => {
    const {
        isWrongCredentials,
        failureReason,
    } = rootState.auth;

    return {
        isWrongCredentials,
        failureReason,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => bindActionCreators({
    submitLogin: authorizeUser,
}, dispatch);

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);

export {LoginPage}