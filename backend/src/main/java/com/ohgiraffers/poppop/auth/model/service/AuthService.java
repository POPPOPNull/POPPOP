package com.ohgiraffers.poppop.auth.model.service;

import com.ohgiraffers.poppop.admin.model.dao.AdminMapper;
import com.ohgiraffers.poppop.admin.model.dto.AdminDTO;
import com.ohgiraffers.poppop.jwt.security.JwtTokenProvider;
import com.ohgiraffers.poppop.member.model.dao.MemberMapper;
import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final MemberMapper memberMapper;
    private final AdminMapper adminMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthService(MemberMapper memberMapper, AdminMapper adminMapper, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.memberMapper = memberMapper;
        this.adminMapper = adminMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public void joinMember(MemberDTO member) {
        member.setPassword(passwordEncoder.encode(member.getPassword())); // 비밀번호 암호화
        System.out.println(member.toString());
        memberMapper.insertMember(member);
        System.out.println(member.toString());
    }

    /** Manager/User 공통 로그인 */
    public String login(String id, String rawPassword) {
        MemberDTO member = memberMapper.findById(id);
        if (member != null && passwordEncoder.matches(rawPassword, member.getPassword())) {
            // 로그인 성공, JWT 토큰 생성 및 반환
            System.out.println("로그인 성공! " + member.toString());
            return jwtTokenProvider.createToken(member.getId(), member.getRole());
        }
        throw new RuntimeException("Invalid credentials");
    }

    /** Admin 로그인  */
    public String adminLogin(String id, String rawPassword) {
        AdminDTO admin = adminMapper.findById(id);

        if (!admin.getPassword().equals(rawPassword)) {
            throw new RuntimeException("Invalid admin password");
        }
        System.out.println("로그인 성공! " + admin.toString());
        return jwtTokenProvider.createToken(admin.getId(), "ADMIN");
    }
}
