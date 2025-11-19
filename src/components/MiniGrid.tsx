import React from "react";
import { deserializeSamples } from "../utils/utils";
import { Sample } from "../types";

interface MiniGridProps {
    snapshot: string;
}

const MiniGrid: React.FC<MiniGridProps> = ({ snapshot }) => {
    const samples: Sample[] = deserializeSamples(snapshot);
    const gridSize = 6;
    const size = 80;
    const cell = Math.floor(size / gridSize);
    return (
        <svg width={size} height={size} style={{ border: "1px solid #eee" }}>
            {Array.from({ length: gridSize + 1 }).map((_, i) => (
                <line key={`v${i}`} x1={i * cell} y1={0} x2={i * cell} y2={size} stroke="#f0f0f0" />
            ))}
            {Array.from({ length: gridSize + 1 }).map((_, i) => (
                <line key={`h${i}`} x1={0} y1={i * cell} x2={size} y2={i * cell} stroke="#f0f0f0" />
            ))}
            {samples.map((s: Sample) => (
                <circle key={s.id} cx={s.x * cell + cell / 2} cy={s.y * cell + cell / 2} r={cell * 0.28} fill="#2e7d32" />
            ))}
        </svg>
    );
};

export default MiniGrid;