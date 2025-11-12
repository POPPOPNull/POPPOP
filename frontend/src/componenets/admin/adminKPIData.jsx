import { useState, useEffect } from "react";
import KPICard from "./adminKPICard";
import { selectUserKpiData } from "../../api/adminAPI";

function KPIData() {
    const [kpiData, setKpiData] = useState({
        // 키 : 백엔드 KpiDTO 필드명과 일치
        totalMembers: null,
        todayVisitors: null,
        cumulativeVisitors: null,
        newMembers: null,
        activeMembers: null
    });

    // 표시할 KPI 목록 배열 (accessor 명 : 백엔드 KpiDTO 필드명과 일치)
    const kpiItems = [
        { title: "전체 회원 수", accessor: "totalMembers", unit: "명" },
        { title: "오늘 방문자 수", accessor: "todayVisitors", unit: "명" },
        { title: "누적 방문자 수", accessor: "cumulativeVisitors", unit: "명" },
        { title: "신규 가입 수", accessor: "newMembers", unit: "명" },
        { title: "활동 회원 수", accessor: "activeMembers", unit: "명" },
    ];

    // KPI 데이터 요청
    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await selectUserKpiData();

                setKpiData(data);
            } catch (error) {
                console.error("KPI 데이터 로딩 실패 : ", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {kpiItems.map(item => (
                <KPICard
                    key={item.accessor}
                    title={item.title}
                    value={kpiData[item.accessor]}
                    unit={item.unit}
                />
            ))}
        </>
    );
}

export default KPIData;