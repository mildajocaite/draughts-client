import React, {useEffect, useState} from 'react';
import classNames from 'classnames'
import styles from './draughts-board.module.scss'
import {DraughtsBoardCell} from "../draughts-board-cell/draught-board-cell";
import {Icon} from "antd";
import {getPositionByMoveNumber, resetBoard} from "../../../utils/draught-board-utils";

interface OwnProps {
    position: number[][];
    possibleToReview?: boolean;
    moves?: string[];
    currentMove?: number;
    onCurrentMoveChange?: (moveNumber: number) => void;
    onDraughtClick?: (row: number, column: number) => void;
}

export const DraughtsBoard: React.FC<OwnProps> =
    (props) => {

        const numbers_array = Array.from(Array(8).keys());
        const numbers_header = Array.from(Array(10).keys());
        const [positionToShow, setPositionToShow] = useState(resetBoard());
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            if (!props.possibleToReview) {
                setPositionToShow(props.position);
            }
            if (props.currentMove === 0 && props.position) {
                setPositionToShow(props.position);
            }
            if (props.moves && props.currentMove) {
                const movesList = props.moves;
                const position = props.position.map(function (array) {
                    return array.slice();
                });
                const updatedPosition = getPositionByMoveNumber(position, props.currentMove, movesList);
                if (updatedPosition) {
                    setPositionToShow(updatedPosition);
                }
            }
            setIsLoading(false);
        }, [props.currentMove, props.position, props.moves, props.possibleToReview]);


        const getNextMove = () => {
            if (props.moves && (props.currentMove || props.currentMove === 0) && props.moves.length > props.currentMove) {
                props.onCurrentMoveChange!(props.currentMove + 1);
            }
        };

        const getPreviousMove = () => {
            if (props.currentMove && props.currentMove > 1) {
                props.onCurrentMoveChange!(props.currentMove - 1);
            }
            if (props.currentMove === 1) {
                props.onCurrentMoveChange!(0);
            }
        };

        const getStart = () => {
            props.onCurrentMoveChange!(0);
        };

        const getEnd = () => {
            if (props.moves) {
                props.onCurrentMoveChange!(props.moves.length);
            }
        };

        const boardClassNames = classNames(
            styles['draughts-table'],
            props.possibleToReview && styles['show-actions']
        );

        return (
            isLoading ?
                (
                    <Icon type="loading"/>
                ) :
                (
                    <table className={boardClassNames}>
                        <tbody>
                        <tr key="-1">
                            {numbers_header.map((row, index) => {
                                return (
                                    <td key={index.toString()} className={styles['notation-top']}/>
                                );
                            })
                            }
                        </tr>
                        {numbers_array.map((i) => {
                            return (
                                <tr key={i}>
                                    <td key={8 - i} className={styles['notation-left']}>
                                        {8 - i}
                                    </td>
                                    {positionToShow[i].map((row, index) => {
                                        return (
                                            <DraughtsBoardCell
                                                key={i.toString() + row + index}
                                                column={index}
                                                row={i}
                                                code={row}
                                                id={i.toString() + row + index}
                                                onClick={props.onDraughtClick}
                                            />
                                        );
                                    })}
                                    <td key={i.toString + "right"} className={styles['notation-right']}/>
                                </tr>
                            );
                        })
                        }
                        <tr>
                            <td className={styles['notation-bottom']}/>
                            <td className={styles['notation-bottom']}>A</td>
                            <td className={styles['notation-bottom']}>B</td>
                            <td className={styles['notation-bottom']}>C</td>
                            <td className={styles['notation-bottom']}>D</td>
                            <td className={styles['notation-bottom']}>E</td>
                            <td className={styles['notation-bottom']}>F</td>
                            <td className={styles['notation-bottom']}>G</td>
                            <td className={styles['notation-bottom']}>H</td>
                            <td className={styles['notation-bottom']}/>
                        </tr>
                        {
                            props.possibleToReview && (
                                <tr key="actions">
                                    <td key="0" className={styles['icon-row']}/>
                                    <td key="1"/>
                                    <td key="2"/>
                                    <td key="3">
                                        <Icon type="backward" onClick={getStart}/>
                                    </td>
                                    <td key="4" className="board-icon">
                                        <Icon type="caret-left"
                                              onClick={getPreviousMove}/>
                                    </td>
                                    <td key="5" className="board-icon">
                                        <Icon type="caret-right" onClick={getNextMove}/>
                                    </td>
                                    <td key="6">
                                        <Icon type="forward" onClick={getEnd}/>
                                    </td>
                                    <td key="7"/>
                                    <td key="8"/>
                                    <td key="9" className={styles['icon-row']}/>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                )
        )
    };
