package com.ohgiraffers.poppop.user.model.service;

import com.ohgiraffers.poppop.user.model.dao.UserMapper;
import com.ohgiraffers.poppop.user.model.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserMapper userMapper;

    public UserService(UserMapper userMapper){
        this.userMapper = userMapper;
    }

    public List<UserDTO> selectUserList() {

        return userMapper.selectUserList();
    }

    public void registUser(UserDTO userDTO) {
        userMapper.regisetUser(userDTO);
    }

    public void removeUser(int id) {
        userMapper.removeUser(id);
    }

    public void updateUser(int id, String name) {
        userMapper.updateUser(id,name);
    }
}
