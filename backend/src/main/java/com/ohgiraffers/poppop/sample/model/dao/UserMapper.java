package com.ohgiraffers.poppop.sample.model.dao;

import com.ohgiraffers.poppop.sample.model.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {



    List<UserDTO> selectUserList();

    void regisetUser(UserDTO userDTO);

    void removeUser(int id);

    void updateUser(int id, String name);
}
