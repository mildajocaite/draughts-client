import React from 'react';
import {Steps} from "antd";
import Card from "antd/lib/card";
import {connect} from "react-redux";
import {RootState} from "../../../../redux/state/root-state";
import {AddPosition} from './step1/add-position'
import {AddSolution} from "./step2/add-solution";
import {AddParameters} from "./step3/add-parameters";

const {Step} = Steps;


interface StateProps {
    step: number;
}

type Props = StateProps;

export const CreateTaskComponent: React.FC<Props> =
    (props) => {

        const stepComponent = () => {
            switch (props.step) {
                case 0:
                    return <AddPosition />;
                case 1:
                    return <AddSolution />;
                case 2:
                    return <AddParameters />;
            }
        };

        return (

            <Card title="UŽDAVINIO KŪRIMAS" style={{margin: '20px'}}>
                <Steps current={props.step}>
                    <Step key="position" title="Pozicija"/>
                    <Step key="solution" title="Sprendimas"/>
                    <Step key="taskProperties" title="Uždavinio parametrai"/>
                </Steps>
                {stepComponent()}
            </Card>
        )
    };

const mapStateToProps = (rootState: RootState): StateProps => {
    const {
        step,
    } = rootState.task;

    return {
        step,
    };
};


const CreateTask = connect(mapStateToProps, null)(CreateTaskComponent);

export {CreateTask}