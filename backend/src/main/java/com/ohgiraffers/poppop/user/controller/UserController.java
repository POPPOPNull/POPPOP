package com.ohgiraffers.poppop.user.controller;

import com.ohgiraffers.poppop.user.model.dto.UserDTO;
import com.ohgiraffers.poppop.user.model.service.UserService;
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



    @GetMapping("/entity")
    public ResponseEntity<Message> getEntity(){

        return ResponseEntity.ok(new Message(123,"hello"));
    }

    @PostMapping("/user")
    public ResponseEntity<?> registUser(@RequestBody UserDTO userDTO){
        userService.registUser(userDTO);

         return ResponseEntity
                 .created(URI.create("/user/user"))
                 .build();
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> removeUser(@PathVariable int id){
        userService.removeUser(id);

        return ResponseEntity
                .created(URI.create("/user/user/"))
                .build();
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UserDTO userDTO){

        userService.updateUser(id,userDTO);

        return ResponseEntity
                .created(URI.create("/user/user/"))
                .build();
    }

}
