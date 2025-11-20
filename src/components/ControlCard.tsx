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
import { RootState, AppDispatch } from "../store/store";
import {
    optimizeCommands,
    serializeSamples,
    runSequence,
    generateRandomSamples,
    formatDateISO,
    uid
} from "../utils/utils";
import { CommandHistoryItem } from "../types";
import store from "../store/store";

interface ControlCardProps { }

const ControlCard: React.FC<ControlCardProps> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { gridSize, samples } = useSelector((state: RootState) => state.app);
    const [speed, setSpeed] = useState<number>(500);
    const [input, setInput] = useState<string>("");
    const [snackOpen, setSnackOpen] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>("");
    const [snackSeverity, setSnackSeverity] = useState<"success" | "error">("success");
    const [isExecuting, setIsExecuting] = useState<boolean>(false);

    const validateCommands = (input: string): boolean => {
        const validChars = ['Л', 'П', 'В', 'Н', 'О', 'Б'];
        return input.split('').every(ch => validChars.includes(ch));
    };

    const showNotification = (message: string, severity: "success" | "error") => {
        setSnackMessage(message);
        setSnackSeverity(severity);
        setSnackOpen(true);
    };

    async function handleExecute(original: string): Promise<void> {
        if (!original.trim()) {
            showNotification("Команда не может быть пустой", "error");
            return;
        }

        if (!validateCommands(original)) {
            showNotification("Неверные команды. Используйте только Л, П, В, Н, О, Б", "error");
            return;
        }

        setIsExecuting(true);

        try {
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

            dispatch(actions.addHistory(historyItem));
            showNotification(
                `Команда успешно выполнена! (${original} → ${optimized})`,
                "success"
            );
        } catch (error) {
            console.error("Ошибка при выполнении команды:", error);
            showNotification("Ошибка при выполнении команды", "error");
        } finally {
            setIsExecuting(false);
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>

            <Typography variant="h6">Ввод команды</Typography>
            <TextField
                placeholder="Команды: Л П В Н О Б"
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                disabled={isExecuting}
                helperText="Л - влево, П - вправо, В - вверх, Н - вниз, О - взять, Б - положить"
            />


            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, alignItems: "center" }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        handleExecute(input);
                        setInput("");
                    }}
                    disabled={isExecuting || !input.trim()}
                    fullWidth={true}
                    sx={{ maxWidth: { sm: "200px" } }}
                >
                    {isExecuting ? "Выполняется..." : "Отправить"}
                </Button>

                {input && (
                    <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-word" }}>
                        Оптимизация: {optimizeCommands(input)}
                    </Typography>
                )}
            </Box>


            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: 2 }}>
                <Typography>Скорость анимации</Typography>
                <Slider
                    value={1000 - speed}
                    min={0}
                    max={900}
                    onChange={(_e, value) => setSpeed(1000 - (value as number))}
                    sx={{ width: { xs: "100%", sm: 180 } }}
                    disabled={isExecuting}
                />
                <Typography variant="body2" color="text.secondary">
                    {speed}ms
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1 }}>
                <Button
                    onClick={() => dispatch(actions.setSamples(generateRandomSamples(gridSize)))}
                    disabled={isExecuting}
                    fullWidth
                >
                    Случайные образцы
                </Button>
                <Button
                    onClick={() => dispatch(actions.resetManipulator())}
                    disabled={isExecuting}
                    fullWidth
                >
                    Сброс манипулятора
                </Button>
            </Box>

            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={() => setSnackOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={snackSeverity} onClose={() => setSnackOpen(false)}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ControlCard;
