import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { selectPopupDetails, approvePopup, rejectPopup } from '../../api/adminAPI';
import { SearchContext } from './SearchProvider';

function AdminManagerPopupDetails() {
    const { popupNo } = useParams();
    const navigate = useNavigate();
    const [popupData, setPopupData ] = useState(null);

    const { setIsSearchEnabled } = useContext(SearchContext);

    // 반려 사유 상태
    const [showRejectionForm, setShowRejectionForm] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const [detailReason, setDetailReason] = useState('');

    // 반려 사유 목록
    const rejectionReasons = [
        "부적절한 컨텐츠",
        "부적절한 키워드",
        "상세 설명 미비",
        "기간 부적합",
        "기타"
    ];

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
        if (!selectedReason) {
            alert('주요 반려 사유를 선택해주세요.');
            return;
        }

        // 선택된 주 사유와 상세 사유를 ,로 결합
        const finalReason = [selectedReason, detailReason]
            .filter(Boolean)    // 상세 사유가 비어 있을 경우 배열에서 제거
            .join(', ');

        if (window.confirm(`다음 사유로 반려 처리하시겠습니까?\n\n${finalReason}`)) {
            try {
                await rejectPopup(popupNo, finalReason);
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
                    <button 
                        onClick={() => setShowRejectionForm(!showRejectionForm)}
                        style={{ marginLeft: '10px', backgroundColor: 'red' }}
                    >
                        반려
                    </button>

                    {/* showRejectionForm이 true일 때 반려 사유 입력 폼 표시 */}
                    {showRejectionForm && (
                        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                            
                            <h4 style={{ marginTop: '0 '}}>반려 사유 입력</h4>

                            <strong>주요 사유 (필수)</strong>
                            <div style={{ margin: '10px 0' }}>
                                {rejectionReasons.map(reason=> (
                                    <div key={reason}>
                                        <input
                                            type='radio'
                                            id={reason}
                                            name='rejectionReason'
                                            value={reason}
                                            checked={selectedReason === reason}
                                            onChange={(e) => setSelectedReason(e.target.value)}
                                        />
                                        <label htmlFor={reason} style={{ marginLeft: '8px' }}>{reason}</label>
                                    </div>
                                ))}
                            </div>

                            <strong>상세 사유 (선택)</strong>
                            <textarea
                                placeholder='상세 반려 사유를 입력하세요.'
                                value={detailReason}
                                onChange={(e) => setDetailReason(e.target.value)}
                                style={{ width: '100%', height: '80px', marginTop: '10px', padding: '8px' }}
                            />

                            <button
                                onClick={handleReject}
                                disabled={!selectedReason}
                                style={{ marginTop: '15px', padding: '10px 15px' }}
                            >
                                반려 확정
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminManagerPopupDetails;