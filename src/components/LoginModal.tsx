import React from "react";
import { Box, Paper } from "@mui/material";
import LoginCard from "./LoginCard";

interface Props {
    open: boolean;
}

const LoginModal: React.FC<Props> = ({ open }) => {
    return (
        <Box sx={{
            width: 400,
            mx: "auto",
            mt: 10,
            outline: "none",
            display: !open ? "none" : "block"
        }}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 6 }}>
                <LoginCard />
            </Paper>
        </Box>
    );
};

export default LoginModal;
