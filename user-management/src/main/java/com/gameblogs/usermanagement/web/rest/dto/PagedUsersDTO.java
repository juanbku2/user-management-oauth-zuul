package com.gameblogs.usermanagement.web.rest.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.hateoas.RepresentationModel;

import java.util.List;

@Builder
@Getter
@ToString
public class PagedUsersDTO extends RepresentationModel<PagedUsersDTO> {

    private final List<UserDTO> elements;

    @Accessors(fluent = true)
    private final boolean hasNext;

    @Accessors(fluent = true)
    private final boolean hasPrevious;

    private final int numberOfElements;

    private final int currentPage;

    private final int size;

    private final long totalElements;

    private final int totalPages;


}
