package ru.kata.spring.boot_security.demo.entity;


import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.persistence.Table;

@Entity
@Table(name = "role")
public class Role implements GrantedAuthority {
    @Id
    @Column(name = "id_role")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name_role")
    private String name;

    @Column(name="context")
    private String contextName;


    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContextName() {
        return contextName;
    }

    public void setContextName(String contextName) {
        this.contextName = contextName;
    }


    @Override
    public String getAuthority() {
        return getName();
    }

    @Override
    public String toString() {
        return name.replace("ROLE_", " ");
    }
}
