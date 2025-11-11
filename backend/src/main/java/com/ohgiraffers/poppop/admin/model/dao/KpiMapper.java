package com.ohgiraffers.poppop.admin.model.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KpiMapper {

    long selectTotalMembers();
    long selectTodayVisitors();
    long selectCumulativeVisitors();
    long selectNewMembers();
    long selectActiveMembers();
}
