import { useContext } from "react";
import { SearchContext } from "./SearchProvider";

function AdminSearchBar(){    

    const { 
        searchText, setSearchText,
        searchCategory, setSearchCategory,
        availableCategory, setAvailableCategory,
        isSearchEnabled             // 검색 기능 활성화 상태를 Context에서 가져오기
     } = useContext(SearchContext);

    return(
        <div className="adminSearchBar" style={{ display: 'flex', alignItems: 'center', gap: '10px',
            backgroundColor: isSearchEnabled ? 'white' : '#f0f0f0'
         }}>
            {/* 검색 카테고리 선택 상자 추가 */}
            {availableCategory && availableCategory.length > 0 && (
                <select 
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="adminSearchBar-select"
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px',
                             backgroundColor: isSearchEnabled ? 'white' : '#f0f0f0' }}   // 기본 스타일
                    disabled={!isSearchEnabled}
                >
                    <option value="전체">전체</option>
                    {/* availableCategory 배열을 순회하며 옵션 생성 */}
                    {availableCategory.map(h => (
                        <option key={h.accessor} value={h.header}>
                            {h.header}
                        </option>
                    ))}
                </select>
            )}
            <img src='/public/icons/search.png' alt="검색" className="side-icon"/>
            <input 
            type="text"
            placeholder="검색어를 입력하세요"
            className="adminSearchBar-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            disabled={!isSearchEnabled}
            style={{ backgroundColor: isSearchEnabled ? 'white' : '#f0f0f0' }}
            />
        </div>
    );
}

export default AdminSearchBar;