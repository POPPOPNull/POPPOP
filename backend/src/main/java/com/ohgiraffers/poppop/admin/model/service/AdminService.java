package com.ohgiraffers.poppop.admin.model.service;

import com.ohgiraffers.poppop.admin.model.dao.AdminMapper;
import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final AdminMapper adminMapper;

    public AdminService(AdminMapper adminMapper) {
        this.adminMapper = adminMapper;
    }

    public long countUsers() {
        return adminMapper.countUsers();
    }

    public List<MemberDTO> selectAllMembers() {
        return adminMapper.selectAllMembers();
    }
}
