import React, {useEffect, useState} from 'react';
import styles from './board-add-solution.module.scss'
import {movesService, RequestPossibleMoves} from "../../../api/service/move-services";
import {openNotification} from "../../../services/notification-service";
import {ErrorMessage} from "../../../api/common/error-message";
import {DraughtsBoardCell} from "../../common/draughts-board-cell/draught-board-cell";
import {PossibleMove} from "../../../model/possible-move";

interface OwnProps {
    position: number[][];
    moves: string[];
    addMove: (move: string, position: number[][]) => void;
    isWhite: boolean;
}

export const BoardAddSolution: React.FC<OwnProps> =
    (props) => {

        const numbers_array = Array.from(Array(8).keys());
        const numbers_header = Array.from(Array(10).keys());
        const [showPossibleMoves, setShowPossibleMoves] = useState(false);
        const [possibleMoves, setPossibleMoves] = useState([] as PossibleMove[]);
        const [selectedRow, setSelectedRow] = useState();
        const [selectedColumn, setSelectedColumn] = useState();

        useEffect(() => {
            const requestData: RequestPossibleMoves = {
                isWhite: props.isWhite,
                position: props.position,
            };
            setShowPossibleMoves(false);
            movesService.getPossibleMoves(requestData)
                .then(response => {
                    setPossibleMoves(response);
                })
                .catch((error: ErrorMessage) => {
                        openNotification("error", "KLAIDA", error.message);
                    }
                );
        }, [props.isWhite, props.position, props.moves]);

        const handleOnClick = (row: number, column: number) => {
            if (showPossibleMoves) {
                const move = possibleMoves.filter(item => (item.newRow === row && item.newColumn === column && item.row === selectedRow && item.column === selectedColumn)).pop();
                if (move) {
                    props.addMove(move.move, move.newPosition);
                    setShowPossibleMoves(false);
                }
            } else {
                setSelectedRow(row);
                setSelectedColumn(column);
                setShowPossibleMoves(true);
            }
        };

        return (
            <table className={styles["draughts-table"]}>
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
                            {props.position[i].map((row, index) => {
                                if (showPossibleMoves && i === selectedRow && index === selectedColumn) {
                                    return <DraughtsBoardCell
                                        key={i.toString() + row + index}
                                        column={index}
                                        row={i}
                                        code={row}
                                        id={i.toString() + row + index}
                                        onClick={() => setShowPossibleMoves(false)}
                                    />
                                }
                                if (showPossibleMoves) {
                                    const cellProps = possibleMoves.some(item => item.newRow === i && item.newColumn === index && item.row === selectedRow && item.column === selectedColumn)
                                        ? {
                                            onClick: handleOnClick,
                                            className: styles.red
                                        }
                                        : {};
                                    return <DraughtsBoardCell
                                        key={i.toString() + row + index}
                                        column={index}
                                        row={i}
                                        code={row}
                                        id={i.toString() + row + index}
                                        {...cellProps}
                                    />

                                } else {
                                    const cellProps = possibleMoves.some(item => item.row === i && item.column === index)
                                        ? {
                                            onClick: handleOnClick,
                                            className: styles.green
                                        }
                                        : {};
                                    return <DraughtsBoardCell
                                        key={i.toString() + row + index}
                                        column={index}
                                        row={i}
                                        code={row}
                                        id={i.toString() + row + index}
                                        {...cellProps}
                                    />

                                }
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
                </tbody>
            </table>
        )
    };
