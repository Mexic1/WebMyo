import { useLayoutEffect, useRef } from 'react';

/**
 * Re-lays a grid by moving its cells rather than crossfading them.
 *
 * Geometry is snapshotted at the END of each layout effect, so the map
 * still holds pre-change positions when the next change lands. That
 * keeps the travel working whatever triggered it — a filter, a sort, or
 * a control somewhere else on the page.
 *
 * `prefers-reduced-motion` skips the travel entirely.
 */
export function useFlip(dependency: unknown, duration = 420) {
    const cells = useRef(new Map<string, HTMLElement>());
    const before = useRef(new Map<string, DOMRect>());

    const register = (key: string) => (el: HTMLElement | null) => {
        if (el) cells.current.set(key, el);
        else cells.current.delete(key);
    };

    useLayoutEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!reduce && before.current.size > 0) {
            cells.current.forEach((el, key) => {
                const prev = before.current.get(key);
                if (!prev) return;

                const next = el.getBoundingClientRect();
                const dx = prev.left - next.left;
                const dy = prev.top - next.top;

                if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

                el.animate(
                    [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
                    { duration, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
                );
            });
        }

        const snapshot = new Map<string, DOMRect>();
        cells.current.forEach((el, key) => snapshot.set(key, el.getBoundingClientRect()));
        before.current = snapshot;
    }, [dependency, duration]);

    return register;
}
