import React from 'react';
import {Cell, Legend, Pie, PieChart, Tooltip} from 'recharts';

export interface PieCharDataType {
    name: string,
    value: number
    key: string
}

export interface OwnProps {
    data: PieCharDataType[];
    colors: string[];
    showLabels?: boolean;
}

export const StatisticsPieChart: React.FC<OwnProps> =
    (props) => {
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}: any) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {percent !== 0 ? `${(percent * 100).toFixed(0)}%` : ``}
                </text>
            );
        };

        const customProps = props.showLabels
            ? {
                labelLine: false,
                label: renderCustomizedLabel
            }
            : {};

        return (

            <PieChart width={330} height={200}>
                <Pie
                    data={props.data}
                    {...customProps}
                    fill="#8884d8"
                    dataKey="value"
                >

                    {
                        props.data.map((entry, index) =>
                            <Cell
                                key={index}
                                fill={props.colors[index % props.colors.length]
                                }/>
                        )
                    }
                </Pie>
                <Tooltip/>
                <Legend layout="vertical" verticalAlign="middle" align="right"/>
            </PieChart>
        )
    };