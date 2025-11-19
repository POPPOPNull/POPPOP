package com.ohgiraffers.poppop.admin.model.service;

import com.ohgiraffers.poppop.admin.model.dao.KpiMapper;
import com.ohgiraffers.poppop.admin.model.dto.MonthlyMemberActivityDTO;
import com.ohgiraffers.poppop.admin.model.dto.MonthlyVisitorStatsDTO;
import com.ohgiraffers.poppop.admin.model.dto.UserKpiDTO;
import com.ohgiraffers.poppop.admin.model.dto.YearlyVisitorStatsDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class KpiService {

    public final KpiMapper kpiMapper;

    public KpiService(KpiMapper kpiMapper) {
        this.kpiMapper = kpiMapper;
    }

    public UserKpiDTO selectUserKpiData() {
        UserKpiDTO kpiData = new UserKpiDTO();
        kpiData.setTotalMembers(kpiMapper.selectTotalMembers());
        kpiData.setTodayVisitors(kpiMapper.selectTodayVisitors());
        kpiData.setCumulativeVisitors(kpiMapper.selectCumulativeVisitors());
        kpiData.setNewMembers(kpiMapper.selectNewMembers());
        kpiData.setActiveMembers(kpiMapper.selectActiveMembers());
        return kpiData;
    }

    public List<MonthlyVisitorStatsDTO> selectMonthlyVisitorStats() {
        return kpiMapper.selectMonthlyVisitorStats();
    }

    public List<YearlyVisitorStatsDTO> selectYearlyVisitorStats() {
        return kpiMapper.selectYearlyVisitorStats();
    }

    public List<MonthlyMemberActivityDTO> selectMonthlyMemberActivityStats() {

        // 월별 활동 회원 수
        List<MonthlyMemberActivityDTO> activeMembersList = kpiMapper.selectMonthlyActiveMembers();

        // 월별 누적 총 회원 수
        List<MonthlyMemberActivityDTO> totalMembersList = kpiMapper.selectMonthlyTotalMembersCumulative();

        // 월별 활동 회원 수, 누적 총 회원 수를 연도-월 을 키로 하는 맵으로 변환하여 병합
        // activeMembersList를 기준으로 맵 생성
        Map<String, MonthlyMemberActivityDTO> combinedMap = activeMembersList.stream()
                .collect(Collectors.toMap(
                        dto -> dto.getVisitYear() + "-" + dto.getVisitMonth(),
                        Function.identity()
                ));

        // totalMembersList를 순회하며 맵에 누적 회원 수를 업데이트
        totalMembersList.forEach(totalDto -> {
            String key = totalDto.getVisitYear() + "-" + totalDto.getVisitMonth();
            // 맵에 해당 월이 이미 있으면(활동 회원) 누적 회원 수를 설정
            // 없으면 새로운 엔트리 추가
            combinedMap.compute(key, (k, existingDto) -> {
                if (existingDto != null) {
                    existingDto.setTotalMembersAtEndOfMonth(totalDto.getTotalMembersAtEndOfMonth());
                    return existingDto;
                } else {
                    return new MonthlyMemberActivityDTO(
                            totalDto.getVisitYear(),
                            totalDto.getVisitMonth(),
                            0,
                            totalDto.getTotalMembersAtEndOfMonth()
                    );
                }
            });
        });

        // 맵의 값들을 리스트로 변환하고, 연도와 월 순으로 정렬하여 반환
        return combinedMap.values().stream()
                .sorted((d1, d2) -> {
                    int yearCompare = Integer.compare(d1.getVisitYear(), d2.getVisitYear());
                    if (yearCompare != 0) {
                        return yearCompare;
                    }
                    return Integer.compare(d1.getVisitMonth(), d2.getVisitMonth());
                })
                .collect(Collectors.toList());
    }
}
