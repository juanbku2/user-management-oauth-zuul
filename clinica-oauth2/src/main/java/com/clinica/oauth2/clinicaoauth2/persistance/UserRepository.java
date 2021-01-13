package com.clinica.oauth2.clinicaoauth2.persistance;

import com.clinica.oauth2.clinicaoauth2.persistance.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String user);
}
