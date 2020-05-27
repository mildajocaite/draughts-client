import React, {ReactElement} from 'react';
import {Card, Col, Row} from "antd";
import {Meta} from "antd/lib/list/Item";
import styles from './task-card.module.scss';
import classNames from 'classnames'

export interface TaskCardSubtitle {
    heading: string | null;
    text: string | null;
}

interface OwnProps {
    boardPosition: ReactElement,
    title: string;
    subtitles: TaskCardSubtitle[];
    loading?: boolean;
    bigger?: boolean;
    actions?: any;
}

export const TaskCard: React.FC<OwnProps> =
    (props) => {

        const cardClassName = classNames(
            styles.card,
            props.bigger && styles.bigger,
        );
        const taskProps = props.actions ? {actions: props.actions} : {};

        return (
            <Card
                size="small"
                className={cardClassName}
                loading={props.loading}
                cover={
                    <div className={styles.position}>
                        {props.boardPosition}
                    </div>
                }
                {...taskProps}
            >
                <Meta
                    title={props.title}
                    description={
                        props.subtitles.map((item, index) => (
                            <Row key={index}>
                                {
                                    item.heading
                                        ? (<>
                                            <Col span={10}>
                                                {item.heading}
                                            </Col>
                                            <Col span={14}>
                                                {item.text}
                                            </Col>
                                        </>)
                                        : <Col span={24}>
                                            {item.text}
                                        </Col>
                                }
                            </Row>
                        ))
                    }
                />
            </Card>
        )
    };
