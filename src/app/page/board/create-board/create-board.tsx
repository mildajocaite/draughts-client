import React from "react";
import Card from "antd/lib/card";
import {bindActionCreators, Dispatch} from "redux";
import {RootActions} from "../../../redux/actions/root-actions";
import {connect} from "react-redux";
import {CreateBoardForm} from "./create-board-form";
import {createBoard} from "../redux/board-action-creator";

interface DispatchProps {
    createBoard: typeof createBoard;
}

type Props = DispatchProps ;

const CreateBoardPageComponent: React.FC<Props> =
    (props) => {

        return (
            <Card title="SUKURTI ŠAŠKIŲ LENTĄ" style={{margin: '20px'}}>
                <CreateBoardForm
                    onSubmit={props.createBoard}
                />
            </Card>
        );
    };


const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => bindActionCreators({
    createBoard: createBoard,
}, dispatch);

const CreateBoard = connect(null, mapDispatchToProps)(CreateBoardPageComponent);

export {CreateBoard}