import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { selectRejectionReasonsByMonth } from "../../api/adminAPI";

import CustomLegend from './CustomLegend';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// 월 선택 드롭다운 메뉴(슬라이드 윈도우 방식 함수 로직)
// 현재 월 기준 이전 10개월 ~ 다음 1개월 (총 12개월) 목록 생성 함수
const generateMonthOptions = () => {
    const months = [];
    const today = new Date();
    for (let i = -10; i <= 1; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
        const monthString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        months.push(monthString);
    }
    return months.reverse();
};

function AdminManagerChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(generateMonthOptions()[1]);
    const monthOptions = generateMonthOptions();

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);
                const responseData = await selectRejectionReasonsByMonth(selectedMonth);

                if (responseData && responseData.length > 0) {
                    const labels = responseData.map(item => item.primaryReason);
                    const data = responseData.map(item => item.reasonCount);

                    setChartData(prev => ({
                        ...prev,
                        labels: labels,
                        datasets: [{ ...prev.datasets[0], data: data }]
                    }));
                } else {
                    setChartData(prev => ({
                        ...prev,
                        labels: ['데이터 없음'],
                        datasets: [{ ...prev.datasets[0], data: [1] }]
                    }));
                }
            } catch (error) {
                setError("데이터를 불러오는 데 실패했습니다.");
                console.error("Error fetching event type ratio:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [selectedMonth]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.chart.getDatasetMeta(0).total;
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
                        return `${label}: ${value.toLocaleString()} 건 (${percentage})`;
                    }
                }
            },
            datalabels: {
                formatter: (value, ctx) => {
                    if (value === 0) return null;
                    const total = ctx.chart.data.datasets[0].data.reduce((acc, data) => acc + data, 0);
                    const percentage = ((value / total) * 100);
                    if (percentage < 1) return null;
                    return percentage.toFixed(1) + '%';
                },
                color: 'black',
                font: {
                    weight: 'bold',
                    size: 12
                }
            }
        }
    };

    if (error) return <div>오류 : {error}</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '90%', width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontWeight: '600', marginTop: '-5px' }}>
                팝업 반려 사유 분포
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    style={{
                        width: '100px', height: '30px',
                        marginRight: '20px'
                    }}
                >
                    {monthOptions.map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', paddingTop: '50px', flexGrow: 1 }}>로딩 중...</div>
            ) : (
                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '70%', height: '100%', position: 'relative' }}>
                        <Pie data={chartData} options={chartOptions} />
                    </div>
                    <div style={{ width: '30%', height: '100%', display: 'flex', alignItems: 'center' }}>
                        <CustomLegend data={chartData} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminManagerChart;
