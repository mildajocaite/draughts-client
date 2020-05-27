import React, {useEffect, useState} from "react";
import Card from "antd/lib/card";
import {EditUserForm} from "./edit-user-form";
import {bindActionCreators, Dispatch} from "redux";
import {RootActions} from "../../../redux/actions/root-actions";
import {connect} from "react-redux";
import {editUser} from "../redux/user-action-creator";
import {openNotification} from "../../../services/notification-service";
import {User} from "../../../model/user";
import {userService} from "../../../api/service/user-service";
import {RouteComponentProps} from "react-router";
import {LoadingIcon} from "../../../components/common/loading-icon/loading-icon";
import {ErrorMessage} from "../../../api/common/error-message";
import {navigationService} from "../../../services/navigation-service";

interface DispatchProps {
    editUser: typeof editUser;
}

interface Params {
    id: string,
}

type Props = DispatchProps & RouteComponentProps<Params> ;

const EditUserPageComponent: React.FC<Props> =
    (props) => {

        const [user, setUser] = useState({} as User);
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            setIsLoading(true);
            const userID: number = parseInt(props.match.params["id"]);
            if (userID) {
                userService.getUser(userID)
                    .then(
                        response => {
                            setUser(response);
                            setIsLoading(false);
                        }
                    )
                    .catch((error: ErrorMessage) => {
                            navigationService.redirectToUsersList();
                            openNotification("error", "KLAIDA", error.message);
                        }
                    );
            }
        }, [props.match.params]);

        return (
            <Card title="REDAGUOTI NAUDOTOJĄ" style={{margin: '20px'}}>
                {
                    isLoading
                        ? <LoadingIcon/>
                        : <EditUserForm
                            initialValues={user}
                            onSubmit={() => props.editUser(user.id)}
                        />
                }
            </Card>
        );
    };


const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => bindActionCreators({
    editUser: editUser,
}, dispatch);

const EditUser = connect(null, mapDispatchToProps)(EditUserPageComponent);

export {EditUser}