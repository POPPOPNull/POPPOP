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

    public List<YearlyVisitorStatsDTO> selectYearlyVisitorStats() {
        return kpiMapper.selectYearlyVisitorStats();
    }

    public List<DailyVisitorDTO> selectDailyVisitorStats() {
        return kpiMapper.selectDailyVisitorStats();
    }
}
