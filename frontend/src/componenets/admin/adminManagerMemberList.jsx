import ListContainer from "./ListContainer";
import { selectAllManager } from "../../api/adminAPI";

function AdminManagerMemberList(){    

    // 테이블 헤더 정보
    const headers = ['아이디', '이름', '연락처', '이메일', '사업자 번호'];

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
        />
    );
}

export default AdminManagerMemberList;