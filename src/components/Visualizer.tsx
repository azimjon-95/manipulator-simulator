import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Sample } from "../types";

interface VisualizerProps { }

const Visualizer: React.FC<VisualizerProps> = () => {
    const { gridSize, manipulator, samples } = useSelector((state: RootState) => state.app);

    const baseSize = 420;
    const cell = Math.floor(baseSize / gridSize);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                alignItems: { xs: "center", md: "flex-start" },
            }}
        >

            <Box sx={{ flex: 1, width: { xs: "100%", md: baseSize }, maxWidth: "100%" }}>
                <Typography variant="h6" sx={{ textAlign: { xs: "center", md: "left" } }}>
                    Сетка манипулятора
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        height: { xs: "auto", md: baseSize },
                        maxWidth: baseSize,
                        aspectRatio: "1 / 1",
                        border: "1px solid #ddd",
                        position: "relative",
                        background: "linear-gradient(#fff,#f7f7f9)",
                    }}
                >
                    <svg width="100%" height="100%" viewBox={`0 0 ${baseSize} ${baseSize}`} style={{ position: "absolute", left: 0, top: 0 }}>

                        {Array.from({ length: gridSize + 1 }).map((_, i) => (
                            <line
                                key={`v${i}`}
                                x1={(i * baseSize) / gridSize}
                                y1={0}
                                x2={(i * baseSize) / gridSize}
                                y2={baseSize}
                                stroke="#e0e0e0"
                            />
                        ))}

                        {Array.from({ length: gridSize + 1 }).map((_, i) => (
                            <line
                                key={`h${i}`}
                                x1={0}
                                y1={(i * baseSize) / gridSize}
                                x2={baseSize}
                                y2={(i * baseSize) / gridSize}
                                stroke="#e0e0e0"
                            />
                        ))}

                        {samples.map((s: Sample) => (
                            <circle
                                key={s.id}
                                cx={(s.x + 0.5) * (baseSize / gridSize)}
                                cy={(s.y + 0.5) * (baseSize / gridSize)}
                                r={(baseSize / gridSize) * 0.28}
                                fill="#2e7d32"
                            />
                        ))}

                        <rect
                            x={manipulator.x * (baseSize / gridSize) + (baseSize / gridSize) * 0.08}
                            y={manipulator.y * (baseSize / gridSize) + (baseSize / gridSize) * 0.08}
                            width={(baseSize / gridSize) * 0.84}
                            height={(baseSize / gridSize) * 0.84}
                            rx={6}
                            fill={manipulator.holding ? "#d32f2f" : "#1976d2"}
                        />
                    </svg>
                </Box>
            </Box>


            <Box sx={{ width: { xs: "100%", md: 300 }, mt: { xs: 2, md: 0 } }}>
                <Typography variant="subtitle1" sx={{ textAlign: { xs: "center", md: "left" } }}>
                    Статус манипулятора
                </Typography>
                <Typography>
                    Позиция: {manipulator.x}, {manipulator.y}
                </Typography>
                <Typography>Держит: {manipulator.holding ? "Да" : "Нет"}</Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" sx={{ textAlign: { xs: "center", md: "left" } }}>
                        Образцы
                    </Typography>
                    {samples.map((s: Sample) => (
                        <Box key={s.id} sx={{ display: "flex", gap: 1, alignItems: "center", my: 0.5 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: 6, background: "#2e7d32" }} />
                            <Typography variant="body2">
                                {s.x}, {s.y}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Visualizer;
