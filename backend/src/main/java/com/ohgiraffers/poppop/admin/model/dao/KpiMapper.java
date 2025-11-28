package com.ohgiraffers.poppop.admin.model.dao;

import com.ohgiraffers.poppop.admin.model.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface KpiMapper {

    long selectTotalMembers();
    long selectTodayVisitors();
    long selectCumulativeVisitors();
    long selectNewMembers();
    long selectActiveMembers();

    long selectManagerMembers();
    long selectOngoingPopupStores();
    long selectPendingPopupStores();
    long selectAllBrands();
    long selectImminentPopupStores();

    List<MonthlyVisitorStatsDTO> selectMonthlyVisitorStats();
    List<DailyVisitorDTO> selectDailyVisitorStats();
    List<Map<String, Object>> selectEventTypeRatioByMonth(@Param("month") String month);
    List<SearchKeywordDTO> selectTop10SearchKeywordsByMonth(String yearMonth);
    List<PopularCategoryDTO> selectPopularCategoriesByMonth(String yearMonth);
    List<PopupStatusDTO> selectPopupStatusByMonth();
    List<RejectionReasonDTO> selectRejectionReasonsByMonth(String yearMonth);
    List<PopularPopupDTO> selectPopularPopupByMonth();
}
