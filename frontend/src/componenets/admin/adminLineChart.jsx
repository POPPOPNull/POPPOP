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
import { selectDailyVisitorStats } from "../../api/adminAPI";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function AdminLineChart({ options }) {
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

                const responseData = await selectDailyVisitorStats();

                if (responseData && responseData.length > 0) {
                    const labels = responseData.map(item => item.visitDate);
                    const totalVisitors = responseData.map(item => item.totalVisitors);
                    const memberVisitors = responseData.map(item => item.memberVisitors);
                    const nonMemberVisitors = responseData.map(item => item.nonMemberVisitors);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: "총 방문자 수",
                                data: totalVisitors,
                                borderColor: 'rgb(54, 162, 235)',
                                backgroundColor: 'rgba(54, 162, 235, 0.5)'
                            },
                            {
                                label: "회원 방문자 수",
                                data: memberVisitors,
                                borderColor: 'rgb(75, 192, 192)',
                                backgroundColor: 'rgba(75, 192, 192, 0.5)'
                            },
                            {
                                label: "비회원 방문자 수",
                                data: nonMemberVisitors,
                                borderColor: 'rgb(255, 205, 86)',
                                backgroundColor: 'rgba(255, 205, 86, 0.5)'
                            }
                        ]
                    });
                } else {
                    setChartData({ labels: ["데이터 없음."], datasets: [] });
                }
            } catch (err) {
                setError("데이터를 불러오는 데 실패했습니다.");
                console.error("Error fetching daily visitor stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    // 차트의 X축 제목을 차트 데이터(날짜)에 따라 동적으로 생성하는 함수
    // 데이터의 첫 날짜와 마지막 날짜를 분석하여 "YYYY년 MM월" 형식으로 반환
    const generateXTitle = () => {
        // 데이터가 없거나 로딩 중일 때 기본 제먹 '날짜' 표시
        if (!chartData.labels || chartData.labels.length === 0 || chartData.labels[0] === "데이터 없음.") {
            return '날짜';
        }

        const firstDate = new Date(chartData.labels[0]);
        const lastDate = new Date(chartData.labels[chartData.labels.length -1]);

        const firstYear = firstDate.getFullYear();
        const firstMonth = firstDate.getMonth() + 1;
        const lastYear = lastDate.getFullYear();
        const lastMonth = lastDate.getMonth() + 1;

        // 데이터가 같은 연도, 같은 월에 포함될 경우 "YYYY년 MM월" 형식으로 표시
        if (firstYear === lastYear && firstMonth === lastMonth) {
            return `${firstYear}년 ${firstMonth}월`;
        }
        // 데이터가 여러 월에 걸쳐 있을 경우 "YYYY년 MM월 - YYYY년 MM월" 형식으로 표시
        else {
            return `${firstYear}년 ${firstMonth}월 - ${lastYear}년 ${lastMonth}월`;
        }
    };

    // 차트의 Y축 항목을 5개로 동적으로 계산하는 함수
    const generateYItem = () => {
        // 데이터가 없으면 기본 설정 반환
        if (!chartData.datasets || chartData.datasets.length === 0 || chartData.datasets.every(d => d.data.length === 0)) {
            return {
                beginAtZero: true,
                title: { display: true, text: '방문자 수 (명) '},
                max: 40,
                ticks: {
                    stepSize: 10,
                    autoSkip: false
                }
            };
        }

        // 모든 데이터셋의 데이터를 하나의 배열로 합친 후 최대값 찾기
        const allData = chartData.datasets.flatMap(dataset => dataset.data);
        const dataMax = Math.max(...allData, 0);

        // dataMax보다 크거나 같은 4의 배수 중 가장 작은 값을 newMax로 설정
        let newMax = Math.ceil(dataMax / 4) * 4;

        // 계산된 newMax가 0이면 최소값을 설정하여 0으로 나누는 것 방지
        if (newMax === 0) {
            newMax = 4;
        }

        // 5개의 눈금(0 포함)을 만들기 위해 stepSize를 newMax/4로 계산
        const stepSize = newMax / 4;

        return {
            beginAtZero: true,
            title: { display: true, text: '방문자 수 (명)' },
            max: newMax,
            ticks: {
                stepSize: stepSize,
                autoSkip: false
            }
        };
    };

    // X축 툴팁 콜백 함수 및 동적 제목 적용
    const chartOptions = options || {
        responsive: true,
        maintainAspectRatio: false,
        Interaction: { mode: 'index', intersect: false },
        plugins: { 
            legend: { position: 'top' }, 
            tooltip: { 
                enabled: true,
                // 툴팁 내용 사용자 정의 콜백 함수
                callbacks: {
                    title: function(context) {
                        const dateLabel = context[0].label;
                        const date = new Date(dateLabel);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        return `${year}년 ${month}월 ${day}일`;
                    },
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y.toLocaleString();
                        }
                        return label + ' 명';
                    }
                }
             }
        },
        scales: {
            x: {
                ticks: {
                    callback: function(val, index) {
                        const label = chartData.labels[val];
                        if (label && label !== "데이터 없음.") {
                            const date = new Date(label);
                            return date.getDate();
                        }
                        return label;
                    }
                },
                title: {
                    display: true,
                    text: generateXTitle()
                }
            },
            y: generateYItem()
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

export default AdminLineChart;