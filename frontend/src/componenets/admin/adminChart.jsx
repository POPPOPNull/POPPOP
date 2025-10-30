import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
        if (chart.config.type === 'doughnut') {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
            if (chart.data.datasets.length > 0 && chart.data.datasets[0].data.length > 0) {
                const sum = chart.data.datasets[0].data.reduce((a, b) => a + Number(b || 0), 0);
                const textLine = ['합계', sum.toLocaleString()];

                ctx.save();
                ctx.font = 'bold 20px Arial';
                ctx.fillStyle = '#1f1b24';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const centerX = (chartArea.left + chartArea.right) / 2;
                const centerY = (chartArea.top + chartArea.bottom) / 2;
                const lineHeight = 25;
                const startY = centerY - (lineHeight * (textLine.length - 1)) / 2;

                textLine.forEach((line, index) => {
                    const y = startY + (index * lineHeight);
                    ctx.fillText(line, centerX, y);
                });

                ctx.restore();
            }
        }
    }
};

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, centerTextPlugin);

function AdminChart({ data, options, height, width }) {
    const defaultData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                data: [30, 45, 25],
                backgroundColor: ['#FFCF0D', '#403F6F', '#1F1B24'],
                hoverOffset: 6,
            },
        ],
    };

    const chartData = data || defaultData;
    const chartOptions = 
        options || 
        {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            layout: {
                padding: 0,
            },
            plugins: {
                datalabels: {
                  display: false,
                },
                legend: { position: 'right', labels: { boxWidth: 12 } },
                tooltip: { enabled: true },
            },
        };

    return(
        <>
        <div className="adminChart-box" style={{ height: height, width: width }}>
            <Doughnut data={chartData} options={chartOptions} />
        </div>
        </>
    );
}

export default AdminChart;