type SeverityBadgeProps = {
    severity: "Mild" | "Moderate" | "Severe";
};

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
    const badgeClass =
        severity === "Severe"
            ? "badge badge-danger"
            : severity === "Moderate"
                ? "badge badge-warning"
                : "badge badge-success";

    const icon =
        severity === "Severe"
            ? "●"
            : severity === "Moderate"
                ? "●"
                : "●";

    return (
        <span className={badgeClass}>
            {icon} {severity}
        </span>
    );
}
