import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import ControlCard from "./ControlCard";
import HistoryTable from "./HistoryTable";
import Visualizer from "./Visualizer";
import { AppDispatch, actions } from "../store/store";


const LogoutIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        width="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ marginRight: 8 }}
    >
        <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
);

const MainPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(actions.logout());
    };

    return (
        <Box
            sx={{
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                width: { xs: "95%", sm: "90%", md: "1200px" },
                padding: { xs: "10px", sm: "20px" },
                gap: { xs: 2, sm: 3 },
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: { xs: 1, sm: 0 },
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
                    gutterBottom
                >
                    Манипулятор — интерфейс управления и оптимизации команд
                </Typography>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{ mt: { xs: 1, sm: 0 } }}
                >
                    Выйти
                </Button>
            </Box>


            <Box
                sx={{
                    display: "flex",
                    gap: { xs: 2, sm: 3 },
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
                <Box sx={{ flex: "1 1 100%", minWidth: { xs: "100%", sm: "300px" } }}>
                    <Paper sx={{ p: 2 }}>
                        <ControlCard />
                    </Paper>
                </Box>

                <Box sx={{ flex: "2 1 100%", minWidth: { xs: "100%", sm: "500px" } }}>
                    <Paper sx={{ p: 2 }}>
                        <Visualizer />
                    </Paper>
                </Box>
            </Box>


            <Box sx={{ width: "100%" }}>
                <Paper sx={{ p: 1 }}>
                    <HistoryTable />
                </Paper>
            </Box>
        </Box>
    );
};

export default MainPanel;
