import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { selectEventTypeRatioByMonth } from "../../api/adminAPI";

ChartJS.register(ArcElement, Tooltip, Legend);

// 월 선택 드롭다운 메뉴
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

function AdminChart() {

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
    const [selectedMonth, setSelectedMonth] = useState(generateMonthOptions()[0]);
    const monthOptions = generateMonthOptions();

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);
                // 선택된 월을 파라미터로 API 호출
                const responseData = await selectEventTypeRatioByMonth(selectedMonth);

                if (responseData && responseData.length > 0) {
                    // API 응답 데이터를 차트 형식에 맞게 가공
                    const labels = responseData.map(item => item.name);
                    const data = responseData.map(item => item.value);

                    setChartData(prev => ({
                        ...prev,
                        labels: labels,
                        datasets: [{ ...prev.datasets[0], data: data }]
                    }));
                } else {
                    // 데이터가 없을 경우 차트 비움.
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
                legend: { position: 'right' },
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
                }
            }
        };

        if (error) return <div>오류 : {error}</div>;

    return(
        <div style={{ position: 'relative', height: '90%', width: '90%' }}>
            <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{ margin: '20px', position: 'absolute', top: 0, right: 0, zIndex: 10,
                         background: 'linear-gradient(to right, #eba9cf, #f4002d)',
                         width: '100px', height: '30px'
                 }}
            >
                {monthOptions.map(month => (
                    <option key={month} value={month}>{month}</option>
                ))}
            </select>

            {loading ? (
                <div style={{ textAlign: 'center', paddingTop: '50px' }}>로딩 중...</div>
            ) : (
                <Pie data={chartData} options={chartOptions} />
            )}
        </div>
    );
}

export default AdminChart;