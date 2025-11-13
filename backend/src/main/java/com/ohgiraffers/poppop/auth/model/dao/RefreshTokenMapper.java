package com.ohgiraffers.poppop.auth.model.dao;

import com.ohgiraffers.poppop.auth.model.dto.RefreshToken;
import org.apache.ibatis.annotations.Param;

public interface RefreshTokenMapper {

    int insertRefreshToken(RefreshToken token);
    RefreshToken findByToken(@Param("token") String token);
    int deleteByToken(@Param("token") String token);
    int deleteByPrincipal(@Param("principalId") String principalId, @Param("principalType") String principalType);
}
