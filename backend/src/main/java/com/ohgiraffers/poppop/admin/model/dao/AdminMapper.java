package com.ohgiraffers.poppop.admin.model.dao;


import com.ohgiraffers.poppop.admin.model.dto.AdminDTO;

import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {

    int countUsers();

    List<MemberDTO> selectAllMembers(String role);
    AdminDTO findById(String id);

}
