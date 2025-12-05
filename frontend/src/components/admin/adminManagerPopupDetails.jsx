import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { selectPopupDetails, approvePopup, rejectPopup } from '../../api/adminAPI';
import { SearchContext } from './searchProvider';
import './AdminManagerPopupDetails.css';

function AdminManagerPopupDetails() {
    const { popupNo } = useParams();
    const navigate = useNavigate();
    const [popupData, setPopupData] = useState(null);
    const { setIsSearchEnabled } = useContext(SearchContext);

    const [showRejectionForm, setShowRejectionForm] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const [detailReason, setDetailReason] = useState('');

    const predefinedReasons = [
        "부적절한 컨텐츠",
        "부적절한 키워드",
        "팝업 설명 미비",
        "기간 부적합",
        "기타"
    ];

    useEffect(() => {
        setIsSearchEnabled(false);
        return () => setIsSearchEnabled(true);
    }, [setIsSearchEnabled]);

    useEffect(() => {
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

    const handleRejectSubmit = async () => {
        if (!selectedReason) {
            alert('주요 반려 사유를 선택해주세요.');
            return;
        }
        const finalReason = [selectedReason, detailReason].filter(Boolean).join(', ');
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

    const getStatusClassName = (status) => {
        if (status === '대기') return 'status-pending';
        if (status === '승인') return 'status-approved';
        if (status === '반려') return 'status-rejected';
        return '';
    };

    return (
        <div className="details-container">
            <div className="details-header">
                <h1>팝업 스토어 상세 정보</h1>
                <button onClick={() => navigate(-1)} className="details-back-button">뒤로가기</button>
            </div>

            <table className="details-table">
                <tbody>
                    <tr><th>팝업 번호 :</th><td>{popupData.no}</td></tr>
                    <tr><th>팝업 이름 :</th><td>{popupData.name}</td></tr>
                    <tr><th>브랜드 명 :</th><td>{popupData.brandName}</td></tr>
                    <tr><th>가맹점 ID :</th><td>{popupData.id}</td></tr>
                    <tr><th>팝업 위치 :</th><td>{popupData.location}</td></tr>
                    <tr><th>카테고리 :</th><td>{popupData.categoryName}</td></tr>
                    <tr><th>오픈 일자 :</th><td>{popupData.startDate}</td></tr>
                    <tr><th>종료 일자 :</th><td>{popupData.endDate}</td></tr>
                    <tr><th>팝업 설명 :</th><td>{popupData.explanation}</td></tr>
                    <tr><th>승인 상태 :</th><td className={getStatusClassName(popupData.approvalStatus)}>{popupData.approvalStatus}</td></tr>
                    {popupData.rejectionReason && <tr><th>반려 사유</th><td>{popupData.rejectionReason}</td></tr>}
                </tbody>
            </table>

            {popupData.approvalStatus === '대기' && (
                <div className="details-actions">
                    <button onClick={handleApprove} className="details-actions-button approve-button">승인</button>
                    <button onClick={() => setShowRejectionForm(!showRejectionForm)} className="details-actions-button reject-button">반려</button>
                </div>
            )}

            {showRejectionForm && (
                <div className="rejection-form">
                    <h4>반려 사유 입력</h4>
                    <strong>주요 사유 (필수)</strong>
                    <div style={{ margin: '10px 0' }}>
                        {predefinedReasons.map(reason => (
                            <div key={reason} className="rejection-form-reason">
                                <input type="radio" id={reason} name="rejectionReason" value={reason} checked={selectedReason === reason} onChange={(e) => setSelectedReason(e.target.value)} />
                                <label htmlFor={reason}>{reason}</label>
                            </div>
                        ))}
                    </div>
                    <strong>상세 사유 (선택)</strong>
                    <textarea placeholder="상세 반려 사유를 입력하세요." value={detailReason} onChange={(e) => setDetailReason(e.target.value)} />
                    <button onClick={handleRejectSubmit} disabled={!selectedReason} className="confirm-reject-button">반려 확정</button>
                </div>
            )}
        </div>
    );
}

export default AdminManagerPopupDetails;
