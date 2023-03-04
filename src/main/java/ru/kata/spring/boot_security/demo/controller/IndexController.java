package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;


@Controller

public class IndexController {
    private UserService userService;
    private RoleRepository roleRepository;
    @Autowired
    public IndexController(UserService userService, RoleRepository roleRepository) {

        this.userService = userService;
        this.roleRepository = roleRepository;
    }
    @GetMapping("/admin")
    public String allUsers(Model model){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = (User) userService.loadUserByUsername(userDetails.getUsername());
        model.addAttribute("user", user);

        List<Role> roles = roleRepository.findAll();
        model.addAttribute("roles", roles);

        return "indexAdmin";
    }

    @GetMapping("/user")
    public String user(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = (User) userService.loadUserByUsername(userDetails.getUsername());
        model.addAttribute("user", user);
        return "indexUser";
    }

}
