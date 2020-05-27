import React, {useState} from 'react';
import {Col, Row} from "antd/lib/grid";
import styles from "./add-solution.module.scss";
import {Button} from "antd";
import {changeSolution, goToNextStep, goToPreviousStep} from "../../../redux/task-action-creator";
import {RootState} from "../../../../../redux/state/root-state";
import {bindActionCreators, Dispatch} from "redux";
import {RootActions} from "../../../../../redux/actions/root-actions";
import {connect} from "react-redux";
import {MovesList} from "../../../../../components/common/moves-list/moves-list";
import {SubmitButton} from "../../../../../components/common/buttons/submit-button/submit-button";
import {CancelButton} from "../../../../../components/common/buttons/cancel-button/cancel-button";
import {BoardAddSolution} from "../../../../../components/domain/board-add-solution/board-add-solution";

interface DispatchProps {
    changeSolution: typeof changeSolution;
    goToPreviousStep: typeof goToPreviousStep;
    goToNextStep: typeof goToNextStep,
}

interface StateProps {
    position: number[][];
    solution: string[];
}

type Props = StateProps & DispatchProps;

const AddSolutionComponent: React.FC<Props> =
    (props) => {

        const [currentMove, setCurrentMove] = useState(0);
        const [isWhite, setIsWhite] = useState(true);
        const [positionToShow, setPositionToShow] = useState(props.position);

        const handleAddMove = (move: string, position: number[][]) => {
            setIsWhite(!isWhite);
            setPositionToShow(position);
            props.changeSolution(
                [
                    ...props.solution,
                    move
                ]
            );
        };

        const removeSolution = () =>{
            props.changeSolution([]);
            setPositionToShow(props.position);
            setIsWhite(true);
        };

        return (
            <div>
                <Row justify="center">
                    <Col lg={7} md={7} className={styles['board-column']}>
                        <BoardAddSolution
                            position={positionToShow}
                            moves={props.solution}
                            isWhite={isWhite}
                            addMove={handleAddMove}
                        />
                        <Button
                            className={styles['clear-button']}
                            size="small" type="primary"
                            onClick={removeSolution}>
                            Ištrinti sprendimą
                        </Button>
                    </Col>
                    <Col lg={14} md={17} className={styles['details-column']}>
                        <h3 className={styles['instructions-title']}>Sprendimas</h3>
                        <MovesList moves={props.solution} currentMove={currentMove} changeCurrentMove={setCurrentMove}/>
                    </Col>
                </Row>
                <Row justify="end">
                    <Col span={24}  className={styles['buttons-row']}>
                        <SubmitButton
                            text="Kitas žingsnis"
                            className={styles['next-button']}
                            type="primary"
                            onClick={props.goToNextStep}
                        />
                        <CancelButton
                            type="primary"
                            className={styles['previous-button']}
                            onClick={props.goToPreviousStep}
                            text="Ankstesnis žingsnis"
                        />
                    </Col>
                </Row>
            </div>
        )
    };


const mapStateToProps = (rootState: RootState): StateProps => {
    const {
        position,
        solution
    } = rootState.task;

    return {
        position,
        solution,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => bindActionCreators({
    changeSolution: changeSolution,
    goToPreviousStep: goToPreviousStep,
    goToNextStep: goToNextStep,
}, dispatch);

const AddSolution = connect(mapStateToProps, mapDispatchToProps)(AddSolutionComponent);

export {AddSolution}
