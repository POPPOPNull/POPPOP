package com.ohgiraffers.poppop.jwt.service;

import com.ohgiraffers.poppop.member.model.dao.MemberMapper;
import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService  implements UserDetailsService {

    private final MemberMapper memberMapper;

    public CustomUserDetailsService(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        // 1. Mapper를 사용하여 DB에서 회원 정보를 Optional<Member> 형태로 조회
        MemberDTO memberEntity = memberMapper.findById(id);

        // 2. 회원이 존재하지 않으면 UsernameNotFoundException
        if (memberEntity == null) {
            throw new UsernameNotFoundException("회원 정보를 찾을 수 없습니다: " + id);
        }

        // 3. 조회된 Member 엔티티의 정보(아이디, 비밀번호, 역할)를 사용해 UserDetails 객체 생성

        // 역할(Role)에 "ROLE_" 접두사를 붙여 권한으로 만듦 (예: "USER" -> "ROLE_USER")
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + memberEntity.getRole());

        return new User(
                memberEntity.getId(), // 아이디
                memberEntity.getPassword(), // 해싱된 비밀번호
                Collections.singletonList(authority) // 권한 목록
        );

    }

}
