/**
 * The featured unit, drawn in the world's only imagery: a quarter-arc
 * and a bar ladder. Portrait, so it holds the same footprint a real
 * vertical product photograph will take when catalog imagery lands.
 *
 * `step` is the unit's position on the condition ladder and `steps` the
 * ladder's length, so the mark follows the vocabulary rather than
 * hardcoding it.
 *
 * It carries no width/height attributes: sizing is CSS, and the
 * viewBox plus the default preserveAspectRatio lets it scale to
 * whatever box the column can spare.
 */
export default function GradeMark({ step, steps = 3 }: { step: number; steps?: number }) {
    const height = 420;
    const arcWidth = 200;
    const barWidth = 26;
    const gap = 22;
    const barsX = arcWidth + 25;
    const width = barsX + steps * (barWidth + gap) - gap;

    return (
        <svg
            className="mark"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMinYMid meet"
            role="img"
            aria-label={`Marcaj geometric, treapta ${step} din ${steps} pe scara de stare`}
        >
            <path
                d={`M0 0 h${arcWidth} v${height - arcWidth} a${arcWidth} ${arcWidth} 0 0 1 -${arcWidth} ${arcWidth} Z`}
                fill="var(--color-signal)"
            />
            {Array.from({ length: steps }, (_, i) => (
                <rect
                    key={i}
                    x={barsX + i * (barWidth + gap)}
                    y={0}
                    width={barWidth}
                    height={height}
                    fill={i < step ? 'var(--color-ink)' : 'var(--color-paper-deep)'}
                />
            ))}
        </svg>
    );
}
