package com.ohgiraffers.poppop.admin.model.service;

import com.ohgiraffers.poppop.admin.model.dao.KpiMapper;
import com.ohgiraffers.poppop.admin.model.dto.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class KpiService {

    public final KpiMapper kpiMapper;

    public KpiService(KpiMapper kpiMapper) {
        this.kpiMapper = kpiMapper;
    }

    public UserKpiDTO selectUserKpiData() {
        UserKpiDTO kpiData = new UserKpiDTO();
        kpiData.setTotalMembers(kpiMapper.selectTotalMembers());
        kpiData.setTodayVisitors(kpiMapper.selectTodayVisitors());
        kpiData.setCumulativeVisitors(kpiMapper.selectCumulativeVisitors());
        kpiData.setNewMembers(kpiMapper.selectNewMembers());
        kpiData.setActiveMembers(kpiMapper.selectActiveMembers());
        return kpiData;
    }

    public List<MonthlyVisitorStatsDTO> selectMonthlyVisitorStats() {
        return kpiMapper.selectMonthlyVisitorStats();
    }

    public List<DailyVisitorDTO> selectDailyVisitorStats() {
        return kpiMapper.selectDailyVisitorStats();
    }

    public List<Map<String, Object>> selectEventTypeRatioByMonth(String month) {
        List<Map<String, Object>> eventCounts = kpiMapper.selectEventTypeRatioByMonth(month);

        if (eventCounts == null || eventCounts.isEmpty()) {
            return List.of();
        }

        // 전체 행동 수 계산
        double totalEvents = eventCounts.stream()
                .mapToDouble(item -> ((Number) item.get("eventCount")).doubleValue())
                .sum();

        // 각 항목의 비율을 계산
        return eventCounts.stream()
                .map(item -> {
                    String eventType = (String) item.get("eventType");
                    double eventCount = ((Number) item.get("eventCount")).doubleValue();
                    // 소수점 둘째 자리까지 반올림하여 퍼센트로 계산
                    double ratio = (totalEvents > 0) ? Math.round((eventCount / totalEvents) * 10000) / 100.0 : 0;

                    Map<String, Object> resultItem = new java.util.HashMap<>();
                    resultItem.put("name", eventType);
                    resultItem.put("value", eventCount);
                    resultItem.put("ratio", ratio);

                    return resultItem;
                })
                .collect(Collectors.toList());
    }

    public List<SearchKeywordDTO> selectTop10SearchKeywordsByMonth(String yearMonth) {
        return kpiMapper.selectTop10SearchKeywordsByMonth(yearMonth);
    }

    public List<PopularCategoryDTO> selectPopularCategoriesByMonth(String yearMonth) {
        return kpiMapper.selectPopularCategoriesByMonth(yearMonth);
    }

    public ManagerKpiDTO selectManagerKpiData() {

        ManagerKpiDTO kpiData = new ManagerKpiDTO();
        kpiData.setManagerCount(kpiMapper.selectManagerMembers());
        kpiData.setOngoingStoreCount(kpiMapper.selectOngoingPopupStores());
        kpiData.setBrandCount(kpiMapper.selectAllBrands());
        kpiData.setPendingStoreCount(kpiMapper.selectPendingPopupStores());
        kpiData.setImminentStoreCount(kpiMapper.selectImminentPopupStores());
        return kpiData;
    }

    public List<PopupStatusDTO> selectPopupStatusByMonth() {
        return kpiMapper.selectPopupStatusByMonth();
    }

    public List<RejectionReasonDTO> selectRejectionReasonsByMonth(String yearMonth) {
        return kpiMapper.selectRejectionReasonsByMonth(yearMonth);
    }
}
