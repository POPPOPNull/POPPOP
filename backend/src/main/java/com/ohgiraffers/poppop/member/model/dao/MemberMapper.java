package com.ohgiraffers.poppop.member.model.dao;


import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {

    void insertMember(MemberDTO memberDTO);

    MemberDTO findById(@Param("id") String id);

    int countById(@Param("id") String id);

    MemberDTO selectMemberById(String id);

    int updateEmail(@Param("id") String id, @Param("email") String email);

    int updatePhone(@Param("id") String id, @Param("phone") String phone);
}
