import React, {ReactElement, useState} from 'react';
import {Icon, Table} from "antd";
import styles from "./table-component.module.scss";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import {combinePlayers, getFiveFirstMoves} from "../../../utils/games-utils";

interface ColumnSearchProps {
    setSelectedKeys: (keys: string[]) => void,
    selectedKeys: string[],
    confirm: () => void,
    clearFilters: () => void,
}

interface OwnProps {
    data: Object[],
    columns: ColumnsDefinition[],
}

export interface ColumnsDefinition {
    title: string,
    key: string,
    dataIndex: string,
    requiredSearch?: boolean,
    sorter?: (a: any, b: any) => any,
    render?: (text: string, record: any) => ReactElement,
    filters?: any,
    onFilter?: (value: string, record: any) => any,
}

export const TableComponent: React.FC<OwnProps> = (props) => {

    const [searchText, setSearchText] = useState('');

    const getColumnSearchProps = (fieldName: string) => ({
        filterDropdown: (
            {setSelectedKeys, selectedKeys, confirm, clearFilters}: ColumnSearchProps) => (
            <div style={{padding: 8}}>
                <Input
                    placeholder={`Ieškoti`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{width: 168, marginBottom: 8, display: 'block'}}
                />
                <Button onClick={() => handleReset(clearFilters)} size="small"
                        style={{width: 80, marginRight: 8}}>
                    Išvalyti
                </Button>

                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 80}}
                >
                    Ieškoti
                </Button>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value: string, record: any) => {
            if(fieldName==="player1"){
                return `${record.player1.lastname} ${record.player1.firstname}`
                    .toLowerCase()
                    .includes(value.toLowerCase());
            }
            if(fieldName==="player2"){
                return `${record.player2.lastname} ${record.player2.firstname}`
                    .toLowerCase()
                    .includes(value.toLowerCase());
            }
            if(fieldName==="coach"){
                return `${record.coach.lastname} ${record.coach.firstname}`
                    .toLowerCase()
                    .includes(value.toLowerCase());
            }
            if(fieldName==="board"){
                return `${record.board.name} | ${record.board.code}`
                    .toLowerCase()
                    .includes(value.toLowerCase());
            }
            if(fieldName==="players"){
                return combinePlayers(record.player1, record.player2)
                    .toLowerCase()
                    .includes(value.toLowerCase());
            }
            if(fieldName==="firstFiveMoves"){
                return getFiveFirstMoves(record.moves)
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase());
            }
            return record[fieldName]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase());
        },
    });

    const handleSearch = (selectedKeys: string[], confirm: () => void) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };


    const columns = props.columns.map(
        (item) => {
            return (
                {
                    title: item.title,
                    key: item.key,
                    dataIndex: item.dataIndex,
                    ...(item.sorter && {sorter: item.sorter}),
                    ...(item.render && {render: item.render}),
                    ...(item.filters && {filters: item.filters}),
                    ...(item.onFilter && {onFilter: item.onFilter}),
                    ...(item.requiredSearch && {...getColumnSearchProps(item.key),}),
                }
            );
        }
    );

    return (

        <Table className={styles["table-center"]} scroll={{x: 'true'}} locale={{
            filterConfirm: 'IEŠKOTI',
            filterReset: 'IŠVALYTI',
            emptyText: 'Nėra duomenų'
        }}
               columns={columns} dataSource={props.data}/>
    );
};