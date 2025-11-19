import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, AppState, LoginPayload, MovePayload, CommandHistoryItem, Sample } from "../types";
import { generateRandomSamples } from "../utils/utils";  // Moved to top - fixes ESLint

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        login(state: AppState, action: PayloadAction<LoginPayload>) {
            const { username, password } = action.payload;
            state.authenticated = username === "admin" && password === "admin";
            if (state.authenticated) {
                state.manipulator = { x: 0, y: 0, holding: false };
                state.samples = generateRandomSamples(state.gridSize);
                state.history = state.history.slice(0, 50);
            }
        },
        logout(state: AppState) {
            state.authenticated = false;
        },
        setGridSize(state: AppState, action: PayloadAction<number>) {
            state.gridSize = action.payload;
        },
        resetManipulator(state: AppState) {
            state.manipulator = { x: 0, y: 0, holding: false };
        },
        setSamples(state: AppState, action: PayloadAction<Sample[]>) {
            state.samples = action.payload;
        },
        moveManipulator(state: AppState, action: PayloadAction<MovePayload>) {
            state.manipulator.x = action.payload.x;
            state.manipulator.y = action.payload.y;
        },
        setHolding(state: AppState, action: PayloadAction<boolean>) {
            state.manipulator.holding = action.payload;
        },
        addHistory(state: AppState, action: PayloadAction<CommandHistoryItem>) {
            state.history.unshift(action.payload);
            if (state.history.length > 50) state.history.pop();
        },
        removeSample(state: AppState, action: PayloadAction<string>) {
            state.samples = state.samples.filter((s) => s.id !== action.payload);
        },
        addSample(state: AppState, action: PayloadAction<Sample>) {
            state.samples.push(action.payload);
        },
    },
});

export const { actions, reducer } = appSlice;

const store = configureStore({
    reducer: {
        app: reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


