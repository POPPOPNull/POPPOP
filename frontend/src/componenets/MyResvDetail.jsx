import "./MyResvDetail.css"

function ResvDetail() {

    return(

        <>
        <div className="resvForm">
            <div className="filter">
                <select>
                    <option>전체 내역</option>
                    <option>예약 완료</option>
                    <option>예약 취소</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>팝업 이름</th>
                        <th>인원</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2025.10.31 08:22:02</td>
                        <td>팝업스토어 이름</td>
                        <td>2</td>
                        <td><span class="status completed">예약 완료</span></td>
                    </tr>

                </tbody>
            </table>
        </div>
        </>
    )
}
export default ResvDetail;