package com.ohgiraffers.poppop.admin.model.dao;

import com.ohgiraffers.poppop.admin.model.dto.DailyVisitorDTO;
import com.ohgiraffers.poppop.admin.model.dto.MonthlyMemberActivityDTO;
import com.ohgiraffers.poppop.admin.model.dto.MonthlyVisitorStatsDTO;
import com.ohgiraffers.poppop.admin.model.dto.YearlyVisitorStatsDTO;
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

    List<MonthlyVisitorStatsDTO> selectMonthlyVisitorStats();
    List<YearlyVisitorStatsDTO> selectYearlyVisitorStats();
    List<DailyVisitorDTO> selectDailyVisitorStats();
    List<Map<String, Object>> selectEventTypeRatioByMonth(@Param("month") String month);
}
