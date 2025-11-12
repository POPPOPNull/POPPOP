package com.ohgiraffers.poppop.admin.model.dao;

<<<<<<< HEAD
=======
import com.ohgiraffers.poppop.admin.model.dto.AdminDTO;
>>>>>>> JWT/master
import com.ohgiraffers.poppop.member.model.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {

    int countUsers();

    List<MemberDTO> selectAllMembers(String role);

<<<<<<< HEAD
=======
    AdminDTO findById(String id);
>>>>>>> JWT/master
}
