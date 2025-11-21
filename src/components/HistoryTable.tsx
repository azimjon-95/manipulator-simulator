import React, { memo, useEffect, useState } from "react";
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
    Skeleton,
} from "@mui/material";
import { useSelector } from "react-redux";
import MiniGrid from "./MiniGrid";
import { RootState } from "../store/store";
import { CommandHistoryItem } from "../types";
import moment from "moment";

interface HistoryTableProps { }

const HistoryTable: React.FC<HistoryTableProps> = () => {
    const history = useSelector((state: RootState) => state.app.history);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(t);
    }, []);

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
                        "& th": { backgroundColor: "#f9f9f9" },
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

                        {/* === SKELETON HOLATI === */}
                        {loading &&
                            [...Array(1)].map((_, idx) => (
                                <TableRow key={idx}>
                                    <TableCell><Skeleton width="80%" /></TableCell>
                                    <TableCell><Skeleton width="80%" /></TableCell>
                                    <TableCell><Skeleton width="60%" /></TableCell>
                                    <TableCell><Skeleton width="60%" /></TableCell>
                                    <TableCell><Skeleton variant="rectangular" width={40} height={40} /></TableCell>
                                    <TableCell><Skeleton variant="rectangular" width={40} height={40} /></TableCell>
                                </TableRow>
                            ))}

                        {/* === MA'LUMOT YO'Q === */}
                        {!loading && history.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography sx={{ py: 2, color: "gray", fontSize: "0.9rem" }}>
                                        Данные отсутствуют
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {/* === ASOSIY MA'LUMOT === */}
                        {!loading &&
                            history.map((h: CommandHistoryItem) => {
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
