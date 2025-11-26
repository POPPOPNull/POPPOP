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

    public void updateEmail(String memberId, String email) {

        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("이메일을 입력해 주세요.");
        }

        int updated = memberMapper.updateEmail(memberId, email);

        if (updated == 0) {
            throw new IllegalArgumentException("이메일을 수정할 수 없습니다.");
        }
    }

    public void updatePhone(String memberId, String phone) {

        if (phone == null || phone.isBlank()) {
            throw new IllegalArgumentException("휴대전화 번호를 입력해 주세요.");
        }

        int updated = memberMapper.updatePhone(memberId, phone);

        if (updated == 0) {
            throw new IllegalArgumentException("휴대전화 번호를 수정할 수 없습니다.");
        }
    }
}
