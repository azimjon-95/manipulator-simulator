import React from "react";
import {
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import MiniGrid from "./MiniGrid";
import { RootState } from "../store/store";
import { CommandHistoryItem } from "../types";
import moment from "moment";

interface HistoryTableProps { }

const HistoryTable: React.FC<HistoryTableProps> = () => {
    const history = useSelector((state: RootState) => state.app.history);

    return (
        <Box>
            <Typography variant="h6">Таблица истории</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Исходная команда</TableCell>
                        <TableCell>Оптимизированная последовательность</TableCell>
                        <TableCell>Дата</TableCell>
                        <TableCell>До</TableCell>
                        <TableCell>После</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((h: CommandHistoryItem) => (
                        <TableRow key={h.id}>
                            <TableCell>{h.original}</TableCell>
                            <TableCell>{h.optimized}</TableCell>
                            <TableCell>{moment(h.date).format("DD.MM.YYYY / HH:mm:ss")}</TableCell>
                            <TableCell><MiniGrid snapshot={h.beforeSnapshot} /></TableCell>
                            <TableCell><MiniGrid snapshot={h.afterSnapshot} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default HistoryTable;