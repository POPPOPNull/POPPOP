package com.ohgiraffers.poppop.admin.model.service;

import com.ohgiraffers.poppop.admin.model.dao.KpiMapper;
import com.ohgiraffers.poppop.admin.model.dto.UserKpiDTO;
import org.springframework.stereotype.Service;

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
}
