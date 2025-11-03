import ListContainer from "./ListContainer";
import { selectAllMembers } from "../../api/adminAPI";

function AdminMemberList(){    

    // 테이블 헤더 정보
    const headers = ['아이디', '이름', '연락처', '이메일', '성별', '생년월일'];

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
        />
    );
}

export default AdminMemberList;