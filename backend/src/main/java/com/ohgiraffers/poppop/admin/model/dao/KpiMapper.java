package com.ohgiraffers.poppop.admin.model.dao;

import com.ohgiraffers.poppop.admin.model.dto.MonthlyVisitorStatsDTO;
import com.ohgiraffers.poppop.admin.model.dto.YearlyVisitorStatsDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface KpiMapper {

    long selectTotalMembers();
    long selectTodayVisitors();
    long selectCumulativeVisitors();
    long selectNewMembers();
    long selectActiveMembers();

    List<MonthlyVisitorStatsDTO> selectMonthlyVisitorStats();
    List<YearlyVisitorStatsDTO> selectYearlyVisitorStats();
}
