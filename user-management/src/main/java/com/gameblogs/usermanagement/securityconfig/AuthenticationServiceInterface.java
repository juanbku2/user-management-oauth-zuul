package com.gameblogs.usermanagement.securityconfig;

import org.springframework.security.core.Authentication;


public interface AuthenticationServiceInterface {
    Authentication getAuthentication();

}
