package com.ohgiraffers.poppop.admin.model.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper {

    int countUsers();
}
