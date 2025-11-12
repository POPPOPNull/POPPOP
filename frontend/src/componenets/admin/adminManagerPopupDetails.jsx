import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { selectPopupDetails, approvePopup, rejectPopup } from '../../api/adminAPI';
import { SearchContext } from './searchProvider';

function AdminManagerPopupDetails() {
    const { popupNo } = useParams();
    const navigate = useNavigate();
    const [popupData, setPopupData ] = useState(null);

    const { setIsSearchEnabled } = useContext(SearchContext);

    useEffect(() => {
        // 상세 페이지 마운트 시 검색 기능 비활성화
        setIsSearchEnabled(false);

        // 상세 페이지 언마운트 시 검색 기능 다시 활성화
        return () => setIsSearchEnabled(true);
    }, []);


    useEffect(() => {

        // 페이지 마운트 시 팝업 스토어 상세 정보 불러오기
        const fetchPopup = async () => {
            try {
                const popupDetails = await selectPopupDetails(popupNo);
                setPopupData(popupDetails);
            } catch (error) {
                console.error("팝업 정보 로딩 실패 : ", error);
                alert("정보를 불러오는 데 실패했습니다.");
            }
        };
        fetchPopup();
    }, [popupNo]);

    // 승인 처리 핸들러
    const handleApprove = async () => {
        if (window.confirm("승인 하시겠습니까?")) {
            try {
                await approvePopup(popupNo);
                alert("승인 처리되었습니다.");
                navigate('/admin/manager-popup');
            } catch (error) {
                alert("승인 처리 중 오류가 발생했습니다.");
            }
        }
    };

    // 반려 처리 핸들러
    const handleReject = async () => {
        const reason = prompt("반려 사유를 입력해주세요.");
        if (reason) {
            try {
                await rejectPopup(popupNo, reason);
                alert("반려 처리되었습니다.");
                navigate('/admin/manager-popup');
            } catch (error) {
                alert("반려 처리 중 오류가 발생했습니다.");
            }
        }
    };

    if (!popupData) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>뒤로가기</button>
            <h1>팝업 스토어 상세 정보</h1>

            <div>팝업 번호 : {popupData.no}</div>
            <div>팝업 이름 : {popupData.name}</div>
            <div>브랜드 명 : {popupData.brandName}</div>
            <div>가맹점 ID : {popupData.id}</div>
            <div>팝업 위치 : {popupData.location}</div>
            <div>카테고리 : {popupData.categoryName}</div>
            <div>오픈 일자 : {popupData.startDate}</div>
            <div>종료 일자 : {popupData.endDate}</div>
            <div>팝업 설명 : {popupData.explanation}</div>
            <div>승인 상태 : {popupData.approvalStatus}</div>
            {popupData.rejectionReason && <div>반려 사유 : {popupData.rejectionReason}</div>}
            <hr/>
            {popupData.approvalStatus === '대기' && (
                <div>
                    <button onClick={handleApprove}>승인</button>
                    <button onClick={handleReject} style={{ marginLeft: '10px', backgroundColor: 'red' }}>반려</button>
                </div>
            )}
        </div>
    );
}

export default AdminManagerPopupDetails;