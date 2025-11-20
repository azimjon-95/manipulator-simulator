export interface Sample {
    x: number;
    y: number;
    id: string;
}

export interface Manipulator {
    x: number;
    y: number;
    holding: boolean;
}

export interface CommandHistoryItem {
    id: string;
    original: string;
    optimized: string;
    date: string;
    beforeSnapshot: string;
    afterSnapshot: string;
}

export interface AppState {
    authenticated: boolean;
    gridSize: number;
    manipulator: Manipulator;
    samples: Sample[];
    history: CommandHistoryItem[];
}

export const initialState: AppState = {
    authenticated: false,
    gridSize: 8,
    manipulator: { x: 0, y: 0, holding: false },
    samples: [],
    history: [],
};

export interface LoginPayload {
    username: string;
    password: string;
}

export interface MovePayload {
    x: number;
    y: number;
}

export interface FormData {
    username: string;
    password: string;
}

export type RootState = {
    app: AppState;
};