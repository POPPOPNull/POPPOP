package com.ohgiraffers.poppop.admin.model.service;

import com.ohgiraffers.poppop.admin.model.dao.AdminMapper;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminMapper adminMapper;

    public AdminService(AdminMapper adminMapper) {
        this.adminMapper = adminMapper;
    }

    public long countUsers() {
        return adminMapper.countUsers();
    }
}
