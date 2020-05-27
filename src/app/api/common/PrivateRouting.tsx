import React from "react";
import {Route, RouteProps} from "react-router";
import {AuthService} from "../../services/auth-service";
import {navigationService} from "../../services/navigation-service";

interface OwnProps {
    component: React.ElementType,
}

export const PrivateRouting: React.FC<OwnProps & RouteProps> = (props) => {
    const {
        component: Component,
        ...rest
    } = props;

    const token = AuthService.getAccessToken();

    if (!token) {
        navigationService.redirectToLogin();
    }
    return (
        <Route {...rest} component={Component}/>
    );
};