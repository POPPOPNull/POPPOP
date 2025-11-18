import ListContainer from "./ListContainer";
import { selectAllManager } from "../../api/adminAPI";
import { useEffect, useContext } from "react";
import { SearchContext } from "./SearchProvider";

function AdminManagerMemberList(){

    // 검색 카테고리 목록
    const { setAvailableCategory, setSearchCategory } = useContext(SearchContext);

    // 테이블 헤더 정보
    const headers = [
        { header: '아이디', accessor: 'id' },
        { header: '이름', accessor: 'name' },
        { header: '연락처', accessor: 'phone' },
        { header: '이메일', accessor: 'email' },
        { header: '사업자 번호', accessor: 'businessNo' }
    ];

    // 컴포넌트 마운트 시 SearchContext 카테고리 목록 설정
    useEffect(() => {
        setAvailableCategory(headers);

        // 컴포넌트 언마운트 시 정리
        return () => {
            setAvailableCategory([]);
            setSearchCategory('전체');
        };
    }, []);

    // 행 렌더링 방식 규정 함수
    const renderManagerMember = (managerMember, layoutClassName) => (
        <div key={managerMember.id} className={`list-row ${layoutClassName}`}>
            <div className="ellipsis">{managerMember.id}</div>
            <div className="ellipsis">{managerMember.name}</div>
            <div className="ellipsis">{managerMember.phone}</div>
            <div className="ellipsis">{managerMember.email}</div>
            <div className="ellipsis">{managerMember.businessNo}</div>
        </div>
    );
    
    return(
        <ListContainer 
            fetchDataFunction={selectAllManager}    // API 호출
            renderItem={renderManagerMember}               // 행 렌더링 방식
            tableHeaders={headers}                  // 테이블 헤더
            layoutClassName="layout-manager-members"
            itemKey="id"
        />
    );
}

export default AdminManagerMemberList;