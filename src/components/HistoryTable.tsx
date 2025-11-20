import React, { memo } from "react";
import {
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    TableContainer,
    Paper,
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
        <Box p={1}>
            <Typography variant="subtitle1" mb={1} sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                История команд
            </Typography>
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 400,
                    border: "1px solid #ddd",
                    overflowX: "auto",
                }}
            >
                <Table
                    stickyHeader
                    size="small"
                    sx={{
                        borderCollapse: "collapse",
                        "& th, & td": {
                            border: "1px solid #eee",
                            fontSize: { xs: "0.65rem", sm: "0.8rem" },
                            padding: { xs: "2px 4px", sm: "4px 8px" },
                        },
                        "& th": {
                            backgroundColor: "#f9f9f9",
                        },
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Исходная команда</TableCell>
                            <TableCell>Оптимизированная</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Время</TableCell>
                            <TableCell>До</TableCell>
                            <TableCell>После</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((h: CommandHistoryItem) => {
                            const dateFormatted = moment(h.date).format("DD.MM.YYYY");
                            const timeFormatted = moment(h.date).format("HH:mm:ss");

                            return (
                                <TableRow key={h.id} hover>
                                    <TableCell>{h.original}</TableCell>
                                    <TableCell>{h.optimized}</TableCell>
                                    <TableCell>{dateFormatted}</TableCell>
                                    <TableCell>{timeFormatted}</TableCell>
                                    <TableCell>
                                        <MiniGrid snapshot={h.beforeSnapshot} />
                                    </TableCell>
                                    <TableCell>
                                        <MiniGrid snapshot={h.afterSnapshot} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default memo(HistoryTable);
