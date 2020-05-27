import React, {useEffect, useState} from "react";
import Card from "antd/lib/card";
import {bindActionCreators, Dispatch} from "redux";
import {RootActions} from "../../../redux/actions/root-actions";
import {connect} from "react-redux";
import {openNotification} from "../../../services/notification-service";
import {RouteComponentProps} from "react-router";
import {boardService} from "../../../api/service/board-service";
import {Board} from "../../../model/board";
import {editBoard} from "../redux/board-action-creator";
import {EditBoardForm} from "./edit-board-form";
import {ErrorMessage} from "../../../api/common/error-message";
import {LoadingIcon} from "../../../components/common/loading-icon/loading-icon";

interface DispatchProps {
    editBoard: typeof editBoard;
}

interface Params {
    id: string,
}

type Props = DispatchProps & RouteComponentProps<Params> ;

const EditBoardPageComponent: React.FC<Props> =
    (props) => {

        const [board, setBoard] = useState({} as Board);
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            setIsLoading(true);
            const boardID: number = parseInt(props.match.params["id"]);
            if (boardID) {
                boardService.getBoard(boardID)
                    .then(
                        response => {
                            setBoard(response);
                            setIsLoading(false);
                        }
                    )
                    .catch((error: ErrorMessage) => {
                            openNotification("error", "KLAIDA", error.message);
                        }
                    )
            }
        }, [props.match.params]);

        return (
            <Card title="REDAGUOTI NAUDOTOJĄ" style={{margin: '20px'}}>
                {
                    isLoading
                        ? <LoadingIcon/>
                        : <EditBoardForm
                            initialValues={board}
                            onSubmit={() => props.editBoard(board.id!)}
                        />
                }
            </Card>
        );
    };


const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => bindActionCreators({
    editBoard: editBoard,
}, dispatch);

const EditBoard = connect(null, mapDispatchToProps)(EditBoardPageComponent);

export {EditBoard}