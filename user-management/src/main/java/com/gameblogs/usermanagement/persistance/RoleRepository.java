package com.gameblogs.usermanagement.persistance;

import com.gameblogs.usermanagement.persistance.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query(value = "SELECT * FROM role WHERE authority IN (:roles)", nativeQuery = true)
    Set<Role> findAllByNameIn(@Param("roles") List<String> roles);

}
