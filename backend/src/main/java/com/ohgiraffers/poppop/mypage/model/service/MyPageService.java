package com.ohgiraffers.poppop.mypage.model.service;

import com.ohgiraffers.poppop.member.model.dao.MemberMapper;
import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MyPageService {

    private final MemberMapper memberMapper;

    private final PasswordEncoder passwordEncoder;

    public MyPageService(MemberMapper memberMapper, PasswordEncoder passwordEncoder) {
        this.memberMapper = memberMapper;
        this.passwordEncoder = passwordEncoder;
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

    public void updatePassword(String memberId, String currentPassword, String newPassword) {

        MemberDTO member = memberMapper.selectMemberById(memberId);
        if (member == null) {
            throw new IllegalArgumentException("회원 정보를 찾을 수 없습니다.");
        }

        if (!passwordEncoder.matches(currentPassword, member.getPassword())) {
            System.out.println("raw currentPassword = " + currentPassword);
            System.out.println("stored password     = " + member.getPassword());
            System.out.println("encoder class       = " + passwordEncoder.getClass());
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        String encodedNewPw = passwordEncoder.encode(newPassword);

        int result = memberMapper.updatePassword(memberId, encodedNewPw);

        if (result == 0) {
            throw new IllegalArgumentException("비밀번호 변경에 실패했습니다.");
        }
    }
}
