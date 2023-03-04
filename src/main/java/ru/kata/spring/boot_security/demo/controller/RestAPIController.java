package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RestAPIController {
    private UserService userService;

    @Autowired
    public RestAPIController(UserService userService) {

        this.userService = userService;
    }
    @GetMapping("/users")
    public List<User> showAllUsers(){
        return userService.showUsers();
    }

    @GetMapping("/user/{id}")
    public User showUser(@PathVariable int id){
        return userService.showUser(id);
    }
    @PostMapping()
    public ResponseEntity<HttpStatus> saveUser (@RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<HttpStatus> updateUser (@RequestBody User user) {
        userService.updateUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @DeleteMapping("/user/{id}")
    public ResponseEntity<HttpStatus> deleteUser (@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}

