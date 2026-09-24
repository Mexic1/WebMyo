import { useEffect, type RefObject } from 'react';

/**
 * Closes an open panel on outside click or Escape. Shared so every
 * dropdown on the page dismisses the same way.
 */
export function useDismiss(
    open: boolean,
    root: RefObject<HTMLElement | null>,
    onClose: () => void,
) {
    useEffect(() => {
        if (!open) return;

        const onPointer = (e: MouseEvent) => {
            if (!root.current?.contains(e.target as Node)) onClose();
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('mousedown', onPointer);
        document.addEventListener('keydown', onKey);

        return () => {
            document.removeEventListener('mousedown', onPointer);
            document.removeEventListener('keydown', onKey);
        };
    }, [open, root, onClose]);
}
