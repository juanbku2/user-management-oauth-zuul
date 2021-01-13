package com.gameblogs.usermanagement.business;

import com.gameblogs.usermanagement.securityconfig.AuthenticationService;
import com.gameblogs.usermanagement.persistance.RoleRepository;
import com.gameblogs.usermanagement.persistance.UserRepository;
import com.gameblogs.usermanagement.persistance.entity.Role;
import com.gameblogs.usermanagement.persistance.entity.RoleType;
import com.gameblogs.usermanagement.persistance.entity.User;
import com.gameblogs.usermanagement.web.rest.dto.PagedUsersDTO;
import com.gameblogs.usermanagement.web.rest.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Set;


@Transactional
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AuthenticationService authenticationService;
    private final RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper, AuthenticationService authenticationService, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.authenticationService = authenticationService;
        this.roleRepository = roleRepository;
    }

    public PagedUsersDTO getUsers(int pageNo, int pageSize) {
        Page<User> pagedResult = userRepository.findAll(PageRequest.of(pageNo, pageSize));


        return userMapper.toPagedUsersDTO(pagedResult);
    }

    public UserDTO lookupUser(Long value) {
        User user;
        UserDTO userDTO;

        user = userRepository.findById(value).orElseThrow(()
                -> new IllegalArgumentException("the next id doest not exist"));
        userDTO = userMapper.toUserDTO(user);

        return userDTO;
    }

    public UserDTO createUser(UserDTO userDTO, MultipartFile file) throws IOException {

        userRepository.findByUsername(userDTO.getUsername()).ifPresent(user -> {
            throw new IllegalArgumentException("the next user already not exist");
        });
        userDTO.setPicByte(file.getBytes());

        User user = userMapper.fromUserDTO(userDTO);
        boolean isAnonymousAuthentication = authenticationService.isAnonymousAuthentication();
        if (userDTO.getRoles() == null) {
            userDTO.setRoles(Collections.singletonList("ROLE_USER"));
        }
        Set<Role> roles = isAnonymousAuthentication
                ? roleRepository.findAllByNameIn(Collections.singletonList(RoleType.ROLE_USER.name()))
                : roleRepository.findAllByNameIn(userDTO.getRoles());

        user.setRoles(roles);


        userRepository.save(user);

        return userMapper.toUserDTO(user);
    }


}