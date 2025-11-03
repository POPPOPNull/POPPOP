import ListContainer from "./ListContainer";
import { selectAllPopup } from "../../api/adminAPI";

function AdminManagerPopupList(){    

    // 테이블 헤더 정보
    const headers = ['팝업 번호', '팝업 이름', '브랜드', '진행 상태', '승인 상태', '가맹점 아이디'];

    // 팝업 데이터 하나를 받아 status 속성을 추가하여 반환하는 함수
    const transformPopup = (managerPopup) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDate = new Date(managerPopup.startDate);
        const endDate = new Date(managerPopup.endDate);

        let status = '';
        if (endDate < today) {
            status = '종료';
        } else if (startDate > today) {
            status = '오픈예정';
        } else {
            status = '진행중';
        }

        // status 속성을 추가하여 새로운 객체로 반환
        return { ...managerPopup, status };
    };

    // 행 렌더링 방식 규정 함수
    const renderManagerPopup = (managerPopup, layoutClassName) => {

        let statusClassName = '';   // 상태별 css 구분
        if (managerPopup.status === '종료') statusClassName = 'status-ended';
        else if (managerPopup.status === '오픈예정') statusClassName = 'status-scheduled';
        else if (managerPopup.status === '진행중') statusClassName = 'status-ongoing';

        return (
            <div key={managerPopup.no} className={`list-row ${layoutClassName}`}>

                <div className="ellipsis">{managerPopup.no}</div>
                <div className="ellipsis">{managerPopup.name}</div>
                <div className="ellipsis">{managerPopup.brandName}</div>
                <div className={`ellipsis center ${statusClassName}`}>{managerPopup.status}</div>
                <div className="ellipsis">{managerPopup.approvalStatus}</div>
                <div className="ellipsis">{managerPopup.id}</div>
            </div>
        );
    };
    
    return(
        <ListContainer 
            fetchDataFunction={selectAllPopup}    // API 호출
            renderItem={renderManagerPopup}               // 행 렌더링 방식
            tableHeaders={headers}                  // 테이블 헤더
            layoutClassName="layout-manager-popup"
            transformItem={transformPopup}
        />
    );
}

export default AdminManagerPopupList;