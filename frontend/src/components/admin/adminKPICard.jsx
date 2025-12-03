function KPICard( { title, value, unit }) {
    return (
        <div className="kpi-card">
            <p className="kpi-title">{title}</p>
            <p className="kpi-value">
                {value !== null ? value.toLocaleString() : '-'}
                <span className="kpi-unit">{unit}</span>
            </p>
        </div>
    );
}

export default KPICard;