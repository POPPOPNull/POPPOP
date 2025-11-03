import { createContext, useState } from "react";

// 관리자 페이지 전역 검색창의 검색어 상태와 상태 변경 함수를 저장할 컴포넌트

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');
    const value = { searchText, setSearchText };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};