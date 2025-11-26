import { useState, useEffect } from "react";
import AdminManagerKPICard from "./AdminManagerKPICard";
import { selectManagerKpiData } from "../../api/adminAPI";

function AdminManagerKPIData() {
    const [kpiData, setKpiData] = useState({
        // 키 : 백엔드 KpiDTO 필드명과 일치
        managerCount: null,
        ongoingStoreCount: null,
        pendingStoreCount: null,
        brandCount: null,
        imminentStoreCount: null
    });

    // 표시할 KPI 목록 배열 (accessor 명 : 백엔드 KpiDTO 필드명과 일치)
    const kpiItems = [
        { title: "가맹점 회원 수", accessor: "managerCount", unit: "명" },
        { title: "진행 팝업 수", accessor: "ongoingStoreCount", unit: "건" },
        { title: "승인 대기 팝업 수", accessor: "pendingStoreCount", unit: "건" },
        { title: "브랜드", accessor: "brandCount", unit: "개" },
        { title: "종료 예정 팝업 수", accessor: "imminentStoreCount", unit: "건" },
    ];

    // KPI 데이터 요청
    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await selectManagerKpiData();

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
                <AdminManagerKPICard
                    key={item.accessor}
                    title={item.title}
                    value={kpiData[item.accessor]}
                    unit={item.unit}
                />
            ))}
        </>
    );
}

export default AdminManagerKPIData;