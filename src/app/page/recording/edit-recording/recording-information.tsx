import React from "react";
import {Descriptions} from "antd";
import {getRecordingStatus} from "../../../utils/recording-parameters-decoder";
import moment from 'moment'
import {Game} from "../../../model/game";

interface OwnProps {
    recording: Game;
}

export const RecordingInformation: React.FC<OwnProps> =
    (props) => {
        return (
            <Descriptions layout="horizontal"
                          column={1}
                          size={"small"}
                          bordered>
                <Descriptions.Item
                    label="Baltais žaidžia">{`${props.recording.player1.lastname} ${props.recording.player1.firstname}`}</Descriptions.Item>
                <Descriptions.Item
                    label="Juodais žaidžia">{`${props.recording.player2.lastname} ${props.recording.player2.firstname}`}</Descriptions.Item>
                <Descriptions.Item
                    label="Interaktyvios lentos kodas">{props.recording.board.code}</Descriptions.Item>
                <Descriptions.Item label="Įrašymo pradžia">
                    {
                        props.recording.startRecording != null ?
                            moment(props.recording.startRecording).format("YYYY-MM-DD HH:mm:ss")
                            :
                            <></>
                    }
                </Descriptions.Item>
                <Descriptions.Item label="Įrašymo statusas">
                    {
                        getRecordingStatus(props.recording.status!)
                    }
                </Descriptions.Item>
            </Descriptions>
        );
    };