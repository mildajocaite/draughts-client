import React from 'react';
import {Col, Row} from "antd/lib/grid";
import styles from "./add-position.module.scss";
import {DraughtsBoard} from "../../../../../components/common/draughts-board/draughts-board";
import {emptyBoard, resetBoard} from "../../../../../utils/draught-board-utils";
import {changePosition, goToNextStep} from "../../../redux/task-action-creator";
import {RootState} from "../../../../../redux/state/root-state";
import {bindActionCreators, Dispatch} from "redux";
import {RootActions} from "../../../../../redux/actions/root-actions";
import {connect} from "react-redux";
import {SubmitButton} from "../../../../../components/common/buttons/submit-button/submit-button";
import {Button} from "antd";

interface DispatchProps {
    changePosition: typeof changePosition;
    goToNextStep: typeof goToNextStep,
}

interface StateProps {
    position: number[][];
}

type Props = StateProps & DispatchProps;

const AddPositionComponent: React.FC<Props> =
    (props) => {
        const changeDraughtType = (row: number, column: number) => {
            const type = props.position[row][column] === 5 ? 1 : props.position[row][column] + 1;
            let newPosition = resetBoard();
            props.position.forEach((row: number[], index: number) => {
                newPosition[index] = row.slice();
            });
            newPosition[row][column] = type;
            props.changePosition(newPosition);
        };

        return (
            <div>
                <Row justify="center">
                    <Col md={7} lg={7} className={styles['board-column']}>
                        <DraughtsBoard position={props.position}
                                       onDraughtClick={changeDraughtType}
                        />
                        <Button
                            className={styles['clear-button']}
                            size="small" type="primary"
                            onClick={() => props.changePosition(emptyBoard())}>
                            Išvalyti lentą
                        </Button>
                    </Col>
                    <Col md={17} lg={14} className={styles['details-column']}>
                        <h3 className={styles['instructions-title']}>Uždavinio padėtis</h3>
                        <p>
                            Uždavinį galite sudėti padėdami šaškes ant lentos. Šaškės padedamos paspaudžiant langelį,
                            ant kurio norite padėti šaškę.
                        </p>
                        <ul>
                            <li>1 paspaudimas - balta šaškė</li>
                            <li>2 paspaudimai - juoda šaškė</li>
                            <li>3 paspaudimai - balta dama</li>
                            <li>4 paspaudimai - juoda dama</li>
                            <li>5 paspaudimai - tuščias langelis</li>
                        </ul>
                    </Col>
                </Row>
                <Row justify="end">
                    <Col span={24} className={styles['buttons-row']}>
                        <SubmitButton
                            className={styles['next-button']}
                            type="primary"
                            onClick={props.goToNextStep}
                            text="Kitas žingsnis"
                        />
                    </Col>
                </Row>
            </div>
        )
    };


const mapStateToProps = (rootState: RootState): StateProps => {
    const {
        position,
    } = rootState.task;

    return {
        position,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => bindActionCreators({
    changePosition: changePosition,
    goToNextStep: goToNextStep,
}, dispatch);

const AddPosition = connect(mapStateToProps, mapDispatchToProps)(AddPositionComponent);

export {AddPosition}
