import { createContext, useState } from "react";

// 관리자 페이지 전역 검색창의 검색어 상태와 상태 변경 함수를 저장할 컴포넌트

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');

    // 검색 카테고리 상태
    const [searchCategory, setSearchCategory] = useState('전체');

    // 현재 페이지의 검색 카테고리 목록을 저장할 상태
    const [availableCategory, setAvailableCategory] = useState([]);

    // 검색 활성화 여부 상태 추가
    const [isSearchEnabled, setIsSearchEnabled] = useState(true);

    const value = { 
        searchText, setSearchText,
        searchCategory, setSearchCategory,
        availableCategory, setAvailableCategory,
        isSearchEnabled, setIsSearchEnabled
     };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};