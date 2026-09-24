export default function Arrow({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M0 5h16" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12.5 1 17 5l-4.5 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
    );
}
