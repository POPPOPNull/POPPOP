import React from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function AdminBarChart({ data, options, height, width }) {
    const defaultData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
            {
                label: "Sales",
                data: [50, 75, 150, 100, 130],
                backgroundColor: ["#403F6F", "#403F6F", "#FFCF0D", "#403F6F", "#403F6F"]
            }
        ]
    };

    const chartOptions = options || {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true }
        }
    };

    return (
        <div style={{ height: height, width: width }}>
            <Bar data={data || defaultData} options={chartOptions} />
        </div>
    );
}

export default AdminBarChart;