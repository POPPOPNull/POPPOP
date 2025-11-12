package com.ohgiraffers.poppop.sample.controller;

import com.ohgiraffers.poppop.sample.model.dto.UserDTO;
import com.ohgiraffers.poppop.sample.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private final UserService userService;


    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserDTO>> selectUserList(){

        return ResponseEntity.ok(new ArrayList<>(userService.selectUserList()));
    }

    @PostMapping("/user")
    public ResponseEntity<?> insertUser(@RequestBody UserDTO userDTO){
        userService.registUser(userDTO);

         return ResponseEntity
                 .created(URI.create("/user/list"))
                 .build();
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id){
        userService.removeUser(id);

        return ResponseEntity
                .noContent().build();
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UserDTO userDTO){

        String name = userDTO.getName();
        System.out.println(userDTO);
        userService.updateUser(id,name);

        return ResponseEntity
                .created(URI.create("/user/list/"+id))
                .build();
    }

}
