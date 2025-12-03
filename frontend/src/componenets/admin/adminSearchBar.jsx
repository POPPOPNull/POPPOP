import { useContext, useState, useEffect, useRef } from "react";
import { SearchContext } from "./SearchProvider";
import "./adminSearchBar.css";

function AdminSearchBar() {
    const {
        searchText, setSearchText,
        searchCategory, setSearchCategory,
        availableCategory,
        isSearchEnabled
    } = useContext(SearchContext);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 외부 클릭 감지하여 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOptionClick = (value) => {
        setSearchCategory(value);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        if (isSearchEnabled) {
            setIsOpen(!isOpen);
        }
    };
    
    // 현재 선택된 카테고리의 전체 객체를 찾기 (accessor도 필요할 수 있으므로)
    const selectedCategoryObject = availableCategory?.find(c => c.header === searchCategory) || { header: "전체" };


    return (
        <div className="adminSearchBar" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {availableCategory && availableCategory.length > 0 && (
                <div 
                    className={`custom-select-container ${isOpen ? 'open' : ''} ${!isSearchEnabled ? 'disabled' : ''}`} 
                    ref={dropdownRef}
                >
                    <div className="custom-select-trigger" onClick={toggleDropdown}>
                        {selectedCategoryObject.header}
                    </div>
                    {isOpen && (
                        <ul className="custom-select-options">
                            <li 
                                className={`custom-select-option ${"전체" === selectedCategoryObject.header ? 'selected' : ''}`}
                                onClick={() => handleOptionClick("전체")}
                            >
                                전체
                            </li>
                            {availableCategory.map(h => (
                                <li
                                    key={h.accessor}
                                    className={`custom-select-option ${h.header === selectedCategoryObject.header ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(h.header)}
                                >
                                    {h.header}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            <img src='/icons/search.png' alt="검색" className="side-icon" />
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