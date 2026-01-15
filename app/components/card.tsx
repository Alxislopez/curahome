type CardProps = {
    children: React.ReactNode;
    className?: string;
    compact?: boolean;
    style?: React.CSSProperties;
};

export default function Card({ children, className = "", compact = false, style }: CardProps) {
    const cardClass = compact ? "card card-compact" : "card";
    return <div className={`${cardClass} ${className}`} style={style}>{children}</div>;
}
