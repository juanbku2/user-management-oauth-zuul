package com.clinica.oauth2.clinicaoauth2.security;

import com.clinica.oauth2.clinicaoauth2.persistance.UserRepository;
import com.clinica.oauth2.clinicaoauth2.persistance.entity.Role;
import com.clinica.oauth2.clinicaoauth2.persistance.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public UserDetails loadUserByUsername(String username) {
        Users users = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User or password incorrect"));

        Set<GrantedAuthority> grantedAuthorities = getAuthorities(users);
        return new org.springframework.security.core.userdetails.User(users.getUsername(), users.getPassword(),  grantedAuthorities);
    }



    private Set<GrantedAuthority> getAuthorities(Users user) {
        Set<Role> roles = user.getRoles();
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority().toString()))
                .collect(Collectors.toSet());
    }
}