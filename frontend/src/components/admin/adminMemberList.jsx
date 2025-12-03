import ListContainer from "./ListContainer";
import { selectAllMembers } from "../../api/adminAPI";
import { useEffect, useContext } from "react";
import { SearchContext } from "./SearchProvider";

function AdminMemberList(){

    // 검색 카테고리 목록
    const { setAvailableCategory, setSearchCategory } = useContext(SearchContext);

    // 테이블 헤더 정보
    const headers = [
        { header: '아이디', accessor: 'id' },
        { header: '이름', accessor: 'name'},
        { header: '연락처', accessor: 'phone' },
        { header: '이메일', accessor: 'email' },
        { header: '성별', accessor: 'gender' },
        { header: '생년월일', accessor: 'birthDate' }
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

    // 멤버 데이터를 하나 받아 gender, birthDate 속성을 가공하여 반환하는 함수
    const transformMember = (member) => {
        return {
            ...member,
            gender: member.gender === 'F' ? '여성' : '남성',
            birthDate: new Date(member.birthDate).toISOString().slice(0, 10)
        };
    };

    // 행 렌더링 방식 규정 함수
    const renderMember = (member, layoutClassName) => (
        <div key={member.id} className={`list-row ${layoutClassName}`}>
            <div className="ellipsis">{member.id}</div>
            <div className="ellipsis">{member.name}</div>
            <div className="ellipsis">{member.phone}</div>
            <div className="ellipsis">{member.email}</div>
            <div className="ellipsis">{member.gender}</div>
            <div className="ellipsis center">{member.birthDate}</div>
        </div>
    );
    
    return(
        <ListContainer 
            fetchDataFunction={selectAllMembers}    // API 호출
            renderItem={renderMember}               // 행 렌더링 방식
            tableHeaders={headers}                  // 테이블 헤더
            layoutClassName="layout-members"
            transformItem={transformMember}
            itemKey="id"
        />
    );
}

export default AdminMemberList;