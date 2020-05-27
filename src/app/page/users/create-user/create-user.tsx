import React from "react";
import Card from "antd/lib/card";
import {CreateUserForm} from "./create-user-form";
import {bindActionCreators, Dispatch} from "redux";
import {RootActions} from "../../../redux/actions/root-actions";
import {connect} from "react-redux";
import {createUser} from "../redux/user-action-creator";

interface DispatchProps {
    createUser: typeof createUser;
}

type Props = DispatchProps ;

const CreateUserPageComponent: React.FC<Props> =
    (props) => {

        return (
            <Card title="SUKURTI NAUDOTOJĄ" style={{margin: '20px'}}>
                <CreateUserForm
                    onSubmit={props.createUser}
                />
            </Card>
        );
    };


const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => bindActionCreators({
    createUser: createUser,
}, dispatch);

const CreateUser = connect(null, mapDispatchToProps)(CreateUserPageComponent);

export {CreateUser}