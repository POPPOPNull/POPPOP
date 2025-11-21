package com.ohgiraffers.poppop.mypage.model.service;

import com.ohgiraffers.poppop.member.model.dao.MemberMapper;
import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import org.springframework.stereotype.Service;

@Service
public class MyPageService {

    private final MemberMapper memberMapper;

    public MyPageService(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    public MemberDTO selectInfo (String memberId) {
        return memberMapper.selectMemberById(memberId);
    }
}
