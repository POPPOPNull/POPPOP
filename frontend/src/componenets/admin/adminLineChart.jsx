import React from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function AdminLineChart({ data, options, height, width }) {
    const defaultData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Users",
                data: [120, 200, 150, 220, 180, 240],
                borderColor: "FFCF0D",
                backgroundColor: "rgba(255, 207, 13, 0.12)",
                tension: 0.3,
                fill: true,
                pointRadius: 3,
            }
        ]
    };

    const chartOptions = options || {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' }, tooltip: { enabled: true } },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "rgba(255,255,255,0.03)" }, beginAtZero: true }
        }
    };

    return (
        <div style={{ height: height, width: width }}>
            <Line data={data || defaultData} options={chartOptions} />
        </div>
    );
}

export default AdminLineChart;