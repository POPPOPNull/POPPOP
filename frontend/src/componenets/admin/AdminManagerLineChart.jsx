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
} from 'chart.js';
import { selectPopupStatusByMonth } from "../../api/adminAPI";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// x축 범례 생성 함수 (오늘 날짜 기준 이전 5개월부터 다음 1개월까지 표시)
const generateLast7Months = () => {
    const months = [];
    const today = new Date();
    for (let i = -5; i <= 1; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
        const monthString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        months.push(monthString);
    }
    return months;
}

function AdminManagerLineChart({ options }) {
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

                const responseData = await selectPopupStatusByMonth();

                // x축 범례로 사용할 최근 7개월 목록 생성
                const last7MonthLabels = generateLast7Months();

                if (responseData) {

                    const dataMap = new Map(responseData.map(item=>[item.month, item]));

                    // 최근 7개월에 맞춰 데이터 재구성
                    const totalData = last7MonthLabels.map(month=>dataMap.get(month)?.totalCount || 0);
                    const approvedData = last7MonthLabels.map(month=>dataMap.get(month)?.approvedCount || 0);
                    const rejectedData = last7MonthLabels.map(month=>dataMap.get(month)?.rejectedCount || 0);

                    setChartData({
                        labels: last7MonthLabels,
                        datasets: [
                            {
                                label: "전체 팝업 수",
                                data: totalData,
                                borderColor: 'rgb(54, 162, 235)',
                                backgroundColor: 'rgba(54, 162, 235, 0.5)'
                            },
                            {
                                label: "승인 팝업 수",
                                data: approvedData,
                                borderColor: 'rgb(75, 192, 192)',
                                backgroundColor: 'rgba(75, 192, 192, 0.5)'
                            },
                            {
                                label: "반려 팝업 수",
                                data: rejectedData,
                                borderColor: 'rgb(255, 205, 86)',
                                backgroundColor: 'rgba(255, 205, 86, 0.5)'
                            }
                        ]
                    });
                } else {
                    setChartData({ labels: last7MonthLabels, datasets: [] });
                }
            } catch (err) {
                setError("데이터를 불러오는 데 실패했습니다.");
                console.error("Error fetching monthly popup stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    // 차트의 X축 제목을 날짜에 따라 동적으로 생성하는 함수
    const generateXTitle = () => {
        return `${new Date().getFullYear()}년`
    };

    // 차트의 Y축 항목을 5개로 동적으로 계산하는 함수
    const generateYItem = () => {
        // 데이터가 없으면 기본 설정 반환
        if (!chartData.datasets || chartData.datasets.length === 0) {
            return {
                max: 4,
                stepSize: 1
            };
        }

        // 모든 데이터셋의 데이터를 하나의 배열로 합친 후 최대값 찾기
        const allData = chartData.datasets.flatMap(dataset => dataset.data);
        const dataMax = Math.max(...allData, 0);

        // dataMax보다 크거나 같은 4의 배수 중 가장 작은 값을 newMax로 설정
        const newMax = dataMax > 0 ? Math.ceil(dataMax / 4) * 4 : 4;

        // 5개의 눈금(0 포함)을 만들기 위해 stepSize를 newMax/4로 계산
        const stepSize = newMax / 4;

        return {
            max: newMax,
            stepSize: stepSize
        };
    };

    const yAxisOptions = generateYItem();

    // X축 툴팁 콜백 함수 및 동적 제목 적용
    const chartOptions = options || {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
            legend: { position: 'top' },
            tooltip: { 
                enabled: true,
                // 툴팁 내용 사용자 정의 콜백 함수
                callbacks: {
                    title: function(context) {
                        return context[0].label;
                    },
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y.toLocaleString() + ' 건';
                        }
                        return label;
                    }
                }
             }
        },
        scales: {
            x: {
                ticks: {
                    callback: function(value, index, ticks) {
                        // 원본 라벨(날짜 데이터) 가져오기
                        const label = this.getLabelForValue(value);
                        // 월 부분만 반환
                        const month = label.split('-')[1];
                        return `${month}월`;
                    }
                },
                title: {
                    display: true,
                    text: generateXTitle()
                }
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: yAxisOptions.max,
                ticks: {
                    stepSize: yAxisOptions.stepSize,
                    precision: 0
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
        <div style={{ position: 'relative', height: '80%', width: '90%' }}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default AdminManagerLineChart;