import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Sample } from "../types";

interface VisualizerProps { }

const Visualizer: React.FC<VisualizerProps> = () => {
    const { gridSize, manipulator, samples } = useSelector((state: RootState) => state.app);
    const size = 420;
    const cell = Math.floor(size / gridSize);
    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6">Сетка манипулятора</Typography>
                <Box
                    sx={{
                        width: size,
                        height: size,
                        border: "1px solid #ddd",
                        position: "relative",
                        background: "linear-gradient(#fff,#f7f7f9)",
                    }}
                >
                    <svg width={size} height={size} style={{ position: "absolute", left: 0, top: 0 }}>
                        {Array.from({ length: gridSize + 1 }).map((_, i) => (
                            <line
                                key={`v${i}`}
                                x1={i * cell}
                                y1={0}
                                x2={i * cell}
                                y2={size}
                                stroke="#e0e0e0"
                            />
                        ))}
                        {Array.from({ length: gridSize + 1 }).map((_, i) => (
                            <line
                                key={`h${i}`}
                                x1={0}
                                y1={i * cell}
                                x2={size}
                                y2={i * cell}
                                stroke="#e0e0e0"
                            />
                        ))}
                        {samples.map((s: Sample) => (
                            <circle
                                key={s.id}
                                cx={s.x * cell + cell / 2}
                                cy={s.y * cell + cell / 2}
                                r={cell * 0.28}
                                fill="#2e7d32"
                            />
                        ))}
                        <rect
                            x={manipulator.x * cell + cell * 0.08}
                            y={manipulator.y * cell + cell * 0.08}
                            width={cell * 0.84}
                            height={cell * 0.84}
                            rx={6}
                            fill={manipulator.holding ? "#d32f2f" : "#1976d2"}
                        />
                    </svg>
                </Box>
            </Box>
            <Box sx={{ width: 300 }}>
                <Typography variant="subtitle1">Статус манипулятора</Typography>
                <Typography>Позиция: {manipulator.x}, {manipulator.y}</Typography>
                <Typography>Держит: {manipulator.holding ? "Да" : "Нет"}</Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">Образцы</Typography>
                    {samples.map((s: Sample) => (
                        <Box key={s.id} sx={{ display: "flex", gap: 1, alignItems: "center", my: 0.5 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: 6, background: "#2e7d32" }} />
                            <Typography variant="body2">{s.x}, {s.y}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Visualizer;