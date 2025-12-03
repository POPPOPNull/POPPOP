import React, { useEffect, useState } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { selectTop10SearchKeywords } from '../../api/adminAPI';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// 최근 12개월 목록을 생성하는 함수
const generateMonthOptions = () => {
    const months = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        months.push(monthString);
    }
    return months;
};

function AdminBarChart() {
    
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(generateMonthOptions()[0]);
    const monthOptions = generateMonthOptions();

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);

                const topKeywords = await selectTop10SearchKeywords(selectedMonth);

                if (topKeywords && topKeywords.length > 0) {

                    const labels = topKeywords.map(item => item.keyword);
                    const data = topKeywords.map(item => item.searchCount);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: '검색 횟수',
                                data: data,
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            }
                        ]
                    });
                } else {
                    setChartData({ labels: ['데이터 없음'], datasets: [{ data: [0] }] });
                }
            } catch (error) {
                setError("데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchChartData();
    }, [selectedMonth]);

    // 눈금 간격 고정
    // 데이터셋에서 최대값 찾기
    const maxDataValue = chartData.datasets.length > 0 && chartData.datasets[0].data.length > 0 ? Math.max(...chartData.datasets[0].data, 0) : 0;

    // y축의 최댓값 계산
    const axisMax = maxDataValue > 0 ? Math.ceil(maxDataValue / 6) * 6 : 6;

    // 눈금 간격 계산
    const stepSize = axisMax / 6;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
            legend: { 
                display: false 
            },
            title: {
                display: true,
                text: `${selectedMonth}월`
            },
        },
        scales: {
            y: { 
                beginAtZero: true,
                min: 0,
                max: axisMax,
                ticks: {
                    stepSize: stepSize,
                    precision: 0
                }
            }
        }
    };

    if (error) return <div>오류 : {error}</div>;

    return (
        <div style={{ position: 'relative', flexDirection: 'column', height: '90%', width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '-5px', fontWeight: '600', marginTop: '-5px' }}>
                인기 검색 키워드 TOP 10
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
                <div style={{ textAlign: 'center', paddingTop: '50px' }}>로딩 중...</div>
            ) : (
                <Bar data={chartData} options={chartOptions} />
            )}
        </div>
    );
}

export default AdminBarChart;