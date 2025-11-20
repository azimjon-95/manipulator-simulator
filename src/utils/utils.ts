import { Sample, CommandHistoryItem } from '../types';

export const uid = (p: string = ""): string =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}${p}`;


export function formatDateISO(d: Date = new Date()): string {
    return d.toISOString();
}

export function optimizeCommands(cmds: string): string {
    cmds = cmds.trim();
    if (!cmds) return "";

    function detectRepeat(s: string): string {
        const n = s.length;
        for (let len = 1; len <= Math.floor(n / 2); len++) {
            const block = s.slice(0, len);
            let times = 0;
            while (s.slice(times * len, (times + 1) * len) === block) times++;
            if (times * len === n && times > 1 && block.length > 1) {
                return `${times}(${detectRepeat(block)})`;
            }
        }

        let res = "";
        let cur = s[0], count = 1;
        for (let i = 1; i < n; i++) {
            if (s[i] === cur) count++;
            else {
                res += count === 1 ? cur : `${count}${cur}`;
                cur = s[i];
                count = 1;
            }
        }
        res += count === 1 ? s[n - 1] : `${count}${s[n - 1]}`;
        return res;
    }

    return detectRepeat(cmds);
}

export function serializeSamples(samples: Sample[]): string {
    return JSON.stringify(samples.map((s) => ({ x: s.x, y: s.y, id: s.id })));
}

export function deserializeSamples(s: string): Sample[] {
    try {
        const parsed = JSON.parse(s);
        if (Array.isArray(parsed)) return parsed as Sample[];
    } catch (e) { }
    return [];
}

export function generateRandomSamples(gridSize: number, count: number = 3): Sample[] {
    const arr: Sample[] = [];
    const taken = new Set<string>();
    while (arr.length < count) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        const k = `${x},${y}`;
        if (taken.has(k) || (x === 0 && y === 0)) continue;
        taken.add(k);
        arr.push({ x, y, id: uid() });
    }
    return arr;
}

export async function runSequence(seq: string, speed: number, store: any): Promise<void> {
    for (let ch of seq) {
        await new Promise((res) => setTimeout(res, speed));
        const s = store.getState();
        const gridSize = s.app.gridSize;
        let mx = s.app.manipulator.x;
        let my = s.app.manipulator.y;
        const holding = s.app.manipulator.holding;

        if (ch === "Л") mx = Math.max(0, mx - 1);
        if (ch === "П") mx = Math.min(gridSize - 1, mx + 1);
        if (ch === "В") my = Math.max(0, my - 1);
        if (ch === "Н") my = Math.min(gridSize - 1, my + 1);

        if (ch === "О") {
            const found = s.app.samples.find((p: Sample) => p.x === mx && p.y === my);
            if (found && !holding) {
                store.dispatch({ type: 'app/removeSample', payload: found.id });
                store.dispatch({ type: 'app/setHolding', payload: true });
            }
        }

        if (ch === "Б") {
            if (holding) {
                store.dispatch({ type: 'app/addSample', payload: { x: mx, y: my, id: uid("d") } });
                store.dispatch({ type: 'app/setHolding', payload: false });
            }
        }

        store.dispatch({ type: 'app/moveManipulator', payload: { x: mx, y: my } });
    }
}
