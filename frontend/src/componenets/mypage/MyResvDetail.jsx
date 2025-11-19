import "./MyResvDetail.css"
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

function ResvDetail() {

    return(

        <>
        <div className="myresv">

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
                        {/* <th style={{width:"14%"}}>예약 날짜</th> */}
                        <th style={{width:"40%"}}>팝업명</th>
                        <th style={{width:"45%"}}>예약 정보</th>
                        <th style={{width:"15%"}}>상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* <td>2025.10.31</td> */}
                        <td className="popup-info">
                            <div className="poster">
                                <img src="/images/plant.png" alt="팝업포스터"/>
                            </div>
                            <div className="details">
                                <p className="title">팝업스토어명</p>
                                <p className="place">위치</p>
                            </div>
                        </td>
                        <td className="reserve-info">
                            <div>
                                <p>예약번호 <span>00000001</span></p>
                                <p>방문일 <span>2025.11.08 13:00</span></p>
                                <p>인원 <span>2</span></p>
                            </div>
                        </td>
                        <td>
                            <span className="status completed">예약 완료</span>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
            
        </div>
        </>
    )
}
export default ResvDetail;