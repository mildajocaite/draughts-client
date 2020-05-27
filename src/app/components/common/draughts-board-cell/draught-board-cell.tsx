import React from 'react';
import black from "../../../resources/black.gif";
import black_king from "../../../resources/black_king.gif";
import blue_cell from "../../../resources/blue_cell.gif";
import white from "../../../resources/white.gif";
import white_cell from "../../../resources/white_cell.gif";
import white_king from "../../../resources/white_king.gif";

interface OwnProps {
    className?: string,
    code: number,
    id: string,
    row: number,
    column: number,
    onClick?: (rowID: number, columnID: number) => void
}

export const DraughtsBoardCell: React.FC<OwnProps> =
    (props) => {
        const imageClassName = props.className ? {className: props.className} : {};

        const getImage = (code: number) => {
            switch (code) {
                case 1:
                    return (
                        <img {...imageClassName} src={white} alt="white"/>
                    );

                case 2:
                    return (
                        <img {...imageClassName} src={black} alt="black"/>
                    );

                case 3:
                    return (
                        <img {...imageClassName} src={white_king} alt="white_king"/>
                    );
                case 4:
                    return (
                        <img {...imageClassName} src={black_king} alt="black_king"/>
                    );
                case 5:
                    return (
                        <img {...imageClassName} src={blue_cell} alt="blue_cell"/>
                    );
                default:
                    return (
                        <img {...imageClassName} src={white_cell} alt="white_cell"/>
                    );
            }
        };

        if (!props || !props.onClick) {
            return (<td key={props.id}>
                {getImage(props.code)}
            </td>);
        }

        return (
            props.code === 6
                ? <td key={props.id}>
                    {getImage(props.code)}
                </td>
                :
                <td onClick={() => props.onClick!(props.row, props.column)} key={props.id}>
                    {getImage(props.code)}
                </td>

        )
            ;
    };