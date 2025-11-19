// import { uid as generateUid } from 'uid'; // Agar kerak bo'lsa, lekin oddiy impl
import { Sample, CommandHistoryItem } from '../types';

export const uid = (p: string = ""): string =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}${p}`;

export function formatDateISO(d: Date = new Date()): string {
    return d.toISOString();
}

export function optimizeCommands(cmds: string): string {
    const letters = cmds.trim();
    if (!letters) return "";
    // run-length encode
    const rle: string[] = [];
    let cur = letters[0];
    let c = 1;
    for (let i = 1; i < letters.length; i++) {
        if (letters[i] === cur) c++;
        else {
            rle.push(c === 1 ? cur : `${c}${cur}`);
            cur = letters[i];
            c = 1;
        }
    }
    rle.push(c === 1 ? cur : `${c}${cur}`);
    const flat = rle.join("");
    // detect repeat
    function detectRepeat(s: string) {
        for (let len = 1; len <= Math.floor(s.length / 2); len++) {
            if (s.length % len !== 0) continue;
            const block = s.slice(0, len);
            let ok = true;
            for (let i = 0; i < s.length; i += len) {
                if (s.slice(i, i + len) !== block) {
                    ok = false;
                    break;
                }
            }
            if (ok) return { times: s.length / len, block: block };
        }
        return null;
    }
    const rep = detectRepeat(letters);
    if (rep && rep.times > 1 && rep.block.length > 1) {
        const blockOpt = optimizeCommands(rep.block);
        return `${rep.times}(${blockOpt})`;
    }
    return flat;
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

export async function runSequence(
    seq: string,
    speed: number = 500,
    store: any // AppStore dan import qiling
): Promise<void> {
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