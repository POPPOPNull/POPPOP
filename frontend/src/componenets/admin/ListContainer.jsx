import { useState, useEffect, useContext } from "react";
import { SearchContext } from "./searchProvider";
import Pagination from "./pagination";

// 모든 데이터를 받아서 리스트로 뿌려주는 컴포넌트

function ListContainer({ fetchDataFunction, renderItem, tableHeaders, layoutClassName, transformItem }) {
    const [allItems, setAllItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;    // 화면에 표시할 행 수
    const { searchText } = useContext(SearchContext);

    useEffect(() => {
        // props로 받은 API 함수를 실행해 데이터 로드
        fetchDataFunction().then(setAllItems);
    }, [fetchDataFunction]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchText]);

    // 데이터 가공 및 필터링 로직 추가
    // props로 받은 transformItem 함수가 있으면 데이터를 가공, 없으면 원본 사용
    const transformedItems = transformItem ? allItems.map(transformItem) : allItems;

    const filteredItems = transformedItems.filter(item => {
        if (!searchText) return true;
        return Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchText.toLowerCase())
        );
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
                    {tableHeaders.map(header => <div key={header}>{header}</div>)}
                </div>
                {filteredItems.length > 0 ? (
                    currentItems.map(item => renderItem(item, layoutClassName))
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