import { useState, useEffect, useContext, cloneElement } from "react";
import { SearchContext } from "./searchProvider";
import Pagination from "./pagination";

// 모든 데이터를 받아서 리스트로 뿌려주는 컴포넌트

function ListContainer({ fetchDataFunction, renderItem, tableHeaders, layoutClassName, transformItem, onItemClick, itemKey }) {
    const [allItems, setAllItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;    // 화면에 표시할 행 수

    const { searchText, searchCategory } = useContext(SearchContext);

    useEffect(() => {
        // props로 받은 API 함수를 실행해 데이터 로드
        fetchDataFunction().then(setAllItems);
    }, [fetchDataFunction]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchText, searchCategory]);

    // 데이터 가공 및 필터링 로직 추가
    // props로 받은 transformItem 함수가 있으면 데이터를 가공, 없으면 원본 사용
    const transformedItems = transformItem ? allItems.map(transformItem) : allItems;

    const filteredItems = transformedItems.filter(item => {
        if (!searchText) return true;

        if (searchCategory === '전체') {
            return Object.values(item).some(value => 
                String(value).toLowerCase().includes(searchText.toLowerCase())
            );
        } else {
            // 카테고리 검색
            const headerObj = tableHeaders.find(h => h.header === searchCategory);
            if (headerObj && item[headerObj.accessor]) {
                return String(item[headerObj.accessor]).toLowerCase().includes(searchText.toLowerCase());
            }
            return false;
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="mp-card">
            <div className="mp-table">
                <div className={`list-header ${layoutClassName}`}>
                    {tableHeaders.map(h => <div key={h.accessor}>{h.header}</div>)}
                </div>
                {filteredItems.length > 0 ? (
                    currentItems.map((item, index ) => {
                        
                        const itemElement = renderItem(item, layoutClassName);

                        return cloneElement(itemElement, {
                            key: item[itemKey] || index,
                            onClick: () => onItemClick && onItemClick(item),
                            style: { ...itemElement.props.style, cursor: 'pointer' }
                        });
                    })
                ) : (
                    <div className="mp-tr">
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                            {searchText ? "검색 결과가 없습니다." : "데이터가 없습니다."}
                        </div>
                    </div>
                )}
            </div>
                <Pagination 
                    totalPages={totalPages} 
                    currentPage={currentPage} 
                    paginate={paginate} 
                />
        </div>
    );
}

export default ListContainer;