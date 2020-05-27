import React from "react";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {goToPreviousStep, submitTask} from "../../../redux/task-action-creator";
import {RootActions} from "../../../../../redux/actions/root-actions";
import {AddParametersForm} from "./add-parameters-form";
import styles from './add-parameters.module.scss'

interface DispatchProps {
    submitTask: typeof submitTask;
    goToPreviousStep: typeof goToPreviousStep,
}

type Props = DispatchProps ;

const AddParametersComponent: React.FC<Props> =
    (props) => {

        return (
            <>
                <h3 className={styles['instructions-title']}>Uždavinio savybės</h3>
                <AddParametersForm
                    onSubmit={props.submitTask}
                    initialValues={{
                        taskResult: "WHITES_START_AND_WIN",
                        taskComplexity: "EASY",
                        taskType: "KOMBINACIJA",

                    }}
                    onPreviousClick={props.goToPreviousStep}
                />
            </>
        );
    };


const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => bindActionCreators({
    submitTask: submitTask,
    goToPreviousStep: goToPreviousStep,
}, dispatch);

const AddParameters = connect(null, mapDispatchToProps)(AddParametersComponent);

export {AddParameters}