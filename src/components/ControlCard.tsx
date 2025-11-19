import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Slider,
    Snackbar,
    Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/store";
import { RootState, AppDispatch } from "../store/store";  // Import AppDispatch here
import { optimizeCommands, serializeSamples, runSequence, generateRandomSamples, formatDateISO, uid } from "../utils/utils";
import { CommandHistoryItem } from "../types";
import store from "../store/store"; // For runSequence

interface ControlCardProps { }

const ControlCard: React.FC<ControlCardProps> = () => {
    const dispatch = useDispatch<AppDispatch>();  // Fixed: Use AppDispatch type
    const { gridSize, samples } = useSelector((state: RootState) => state.app);
    const [speed, setSpeed] = useState<number>(500);
    const [input, setInput] = useState<string>("");
    const [snackOpen, setSnackOpen] = useState<boolean>(false);

    async function handleExecute(original: string): Promise<void> {
        const optimized = optimizeCommands(original);
        const before = serializeSamples(samples);
        await runSequence(original, speed, store);
        const after = serializeSamples(store.getState().app.samples);
        const historyItem: CommandHistoryItem = {
            id: uid(),
            original,
            optimized,
            date: formatDateISO(),
            beforeSnapshot: before,
            afterSnapshot: after,
        };
        dispatch(actions.addHistory(historyItem));  // This works with AppDispatch
        setSnackOpen(true);
    }

    return (
        <Box >
            <Typography variant="h6">Ввод команды</Typography>
            <TextField
                placeholder="Введите последовательность команд: ЛПВНОБ"
                fullWidth
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value.toUpperCase().replace(/[^ЛПВНОБ]/g, ""))}
                sx={{ mt: 2 }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        if (!input) return;
                        handleExecute(input);
                        setInput("");
                    }}
                >
                    Отправить
                </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>

                <Typography>Скорость анимации</Typography>
                <Slider
                    value={1000 - speed}
                    min={0}
                    max={900}
                    onChange={(_: unknown, value: number | number[]) => setSpeed(1000 - (value as number))}  // Fixed: Type _ as unknown
                    sx={{ width: 180 }}
                />
            </Box>

            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={() => setSnackOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity="success">Команда выполнена успешно</Alert>
            </Snackbar>
            <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2">Быстрые команды</Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Button onClick={() => dispatch(actions.setSamples(generateRandomSamples(gridSize)))}>
                        Случайные образцы
                    </Button>
                    <Button onClick={() => dispatch(actions.resetManipulator())}>Сброс манипулятора</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ControlCard;