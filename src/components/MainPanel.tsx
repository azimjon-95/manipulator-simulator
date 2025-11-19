import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import LoginCard from "./LoginCard";
import ControlCard from "./ControlCard";
import HistoryTable from "./HistoryTable";
import Visualizer from "./Visualizer";
import { RootState } from "../store/store";

const MainPanel: React.FC = () => {
    const auth = useSelector((state: RootState) => state.app.authenticated);

    return (
        <>
            {!auth && <LoginCard />}


            <Box
                sx={{
                    display: auth ? "flex" : "none",
                    flexDirection: "column",
                    gap: 3
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Манипулятор — интерфейс управления и оптимизации команд
                </Typography>
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                        <Paper sx={{ p: 3 }}>
                            <ControlCard />
                        </Paper>
                    </Box>

                    <Box sx={{ flex: "2 1 500px", minWidth: "500px" }}>
                        <Paper sx={{ p: 3 }}>
                            <Visualizer />
                        </Paper>
                    </Box>
                </Box>

                <Box sx={{ width: "100%" }}>
                    <Paper sx={{ p: 2 }}>
                        <HistoryTable />
                    </Paper>
                </Box>
            </Box>
        </>
    );
};

export default MainPanel;
