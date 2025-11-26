package com.ohgiraffers.poppop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ohgiraffers.poppop.admin.model.dto.PopupStatusDTO;
import com.ohgiraffers.poppop.admin.model.service.KpiService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false) // 테스트 시 Spring Security 필터를 적용하지 않음
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private KpiService kpiService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getPopupStatus_월별_팝업_상태_조회_테스트() throws Exception {
        // given (준비)
        PopupStatusDTO dto1 = new PopupStatusDTO();
        dto1.setMonth("2025-10");
        dto1.setTotalCount(15);
        dto1.setApprovedCount(10);
        dto1.setRejectedCount(2);

        PopupStatusDTO dto2 = new PopupStatusDTO();
        dto2.setMonth("2025-11");
        dto2.setTotalCount(25);
        dto2.setApprovedCount(20);
        dto2.setRejectedCount(3);

        List<PopupStatusDTO> expectedData = Arrays.asList(dto1, dto2);

        given(kpiService.selectPopupStatusByMonth()).willReturn(expectedData);

        // when & then (실행 및 검증)
        mockMvc.perform(get("/admin/kpi/popup-status")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].month").value("2025-10"))
                .andExpect(jsonPath("$[0].totalCount").value(15))
                .andExpect(jsonPath("$[1].month").value("2025-11"))
                .andExpect(jsonPath("$[1].approvedCount").value(20))
                .andDo(print());
    }
}