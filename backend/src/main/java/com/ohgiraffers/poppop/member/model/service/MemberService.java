package com.ohgiraffers.poppop.member.model.service;

import com.ohgiraffers.poppop.member.model.dao.MemberMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private final MemberMapper memberMapper;

    public MemberService(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    public boolean idAvailable(@Param("id") String id) {

        int count = memberMapper.countById(id);

        return count == 0;
    }
}
