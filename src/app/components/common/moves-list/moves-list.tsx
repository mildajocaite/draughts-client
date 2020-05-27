import React from 'react';
import styles from './moves-list.module.scss';
import classNames from "classnames";

interface OwnProps {
    moves: string[],
    currentMove: number,
    changeCurrentMove: (index: number) => void,
}

export const MovesList: React.FC<OwnProps> =
    (props) => {

        const changeCurrentMove = (data: any) => {
            const currentMove = data.target as HTMLTextAreaElement;
            const currentMoveID = parseInt(currentMove.getAttribute('data-id')!);
            props.changeCurrentMove(currentMoveID + 1);
        };

        return (
            <>
                {props.moves.map((move, row) => {
                    const className = classNames(
                        row === (props.currentMove - 1) && styles['move-text-active']
                    );

                    if (row % 2 === 1) {
                        return (
                            <div key={row + "first"} className={styles["full-move"]}>
                                <p key={row + move}
                                   data-id={row}
                                   className={className}
                                   onClick={changeCurrentMove}
                                >
                                    {`${move} `}
                                </p>
                            </div>
                        )
                    } else {
                        return (
                            <div key={row + "second"} className={styles["full-move"]}>
                                <p
                                    key={row + move}
                                    data-id={row}
                                    className={className}
                                    onClick={changeCurrentMove}
                                >
                                    {`${(row / 2) + 1}.${move} `}
                                </p>
                            </div>
                        )
                    }
                })}
            </>
        )
    };
