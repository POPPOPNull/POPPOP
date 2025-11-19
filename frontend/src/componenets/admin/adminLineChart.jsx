import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Interaction,
} from 'chart.js';
import { selectMonthlyVisitorStats, selectMonthlyMemberActivityStats } from "../../api/adminAPI";
import { callback } from "chart.js/helpers";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function AdminLineChart({ options, height, width }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);

                // 월별 데이터 로드 (Promise.all로 2개의 API를 동시 요청)
                const [
                    visitorStats,   // 회원가입률
                    memberActivityStats // 활동 회원 비율
                ] = await Promise.all([
                    selectMonthlyVisitorStats(),
                    selectMonthlyMemberActivityStats()
                ]);

                if (visitorStats && visitorStats.length > 0) {

                    const labels = visitorStats.map(item => `${item.visitMonth}월`);

                    // 월별 회원가입률 계산 (회원 가입 수 / 방문자 수 * 100)
                    const signupRates = visitorStats.map(item => {
                        // 방문자 수가 0일 경우 0으로 처리하여 NaN 방지
                        if (item.visitorCount === 0) return 0;
                        return ((item.signupCount / item.visitorCount ) * 100).toFixed(2);
                    });

                    // 월별 활동 회원 비율 계산 (활동 회원 수 / 회원 수 * 100)
                    const activeMemberRates = memberActivityStats.map(item => {
                        if (item.totalMembersAtEndOfMonth === 0) return 0;
                        return ((item.activeMembers / item.totalMembersAtEndOfMonth) * 100).toFixed(2);
                    });

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: "월별 회원가입률 (%)",
                                data: signupRates,
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)'
                            },
                            {
                                label: "활동 회원 비율 (%)",
                                data: activeMemberRates,
                                borderColor: 'rgb(54, 162, 235)',
                                backgroundColor: 'rgba(54, 162, 235, 0.5)'
                            }
                        ]
                    });
                } else {
                    setChartData({
                        labels: ["데이터 없음."],
                        datasets: [{ label: "데이터 없음.", data: [0] }]
                    });
                }
            } catch (err) {
                setError("데이터를 불러오는 데 실패했습니다.");
                console.error("Error fetching monthly visitor stats:", err);
                setChartData({
                    labels: ["오류"],
                    datasets: [{ label: "오류", data: [0] }]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    const chartOptions = options || {
        responsive: true,
        maintainAspectRatio: false,
        Interaction: { mode: 'index', intersect: false },
        plugins: { 
            legend: { position: 'top' }, 
            tooltip: { 
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + '%';
                        }
                        return label;
                    }
                }
             }
        },
        scales: {
            y: {
                title: { display: true, text: '비율 (%)' },
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        }
    };

    if (loading) {
        return <div>로딩 중...</div>
    }

    if (error) {
        return <div>오류: {error}</div>
    }

    return (
        <div style={{ height: height, width: width }}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default AdminLineChart;