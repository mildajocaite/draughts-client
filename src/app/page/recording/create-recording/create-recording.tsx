import React from "react";
import Card from "antd/lib/card";
import {bindActionCreators, Dispatch} from "redux";
import {RootActions} from "../../../redux/actions/root-actions";
import {connect} from "react-redux";
import {createRecording} from "../redux/recording-action-creator"
import {CreateRecordingForm} from "./create-recording-form";

interface DispatchProps {
    createRecording: typeof createRecording;
}

type Props = DispatchProps;

const CreateRecodingPageComponent: React.FC<Props> =
    (props) => {

        return (
            <Card title="PRADĖTI PARTIJOS ĮRAŠYMĄ" style={{margin: '20px'}}>
                <CreateRecordingForm
                    onSubmit={props.createRecording}
                />
            </Card>
        );
    };


const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => bindActionCreators({
    createRecording: createRecording,
}, dispatch);

const CreateRecording = connect(null, mapDispatchToProps)(CreateRecodingPageComponent);

export {CreateRecording}