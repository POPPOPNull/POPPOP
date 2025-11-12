import React, { useState } from "react";
import "./MyInfoDetail.css"

function InfoDetail() {

    const [name, setName] = useState("홍길동");
    const [userId, setUserId] = useState("example");
    const [email, setEmail] = useState("example@gmail.com");
    const [birthday, setBirthday] = useState("YYMMDD");
    const [phone, setPhone] = useState("01012345678");

    return(

        <>
        <div className="infoForm">
            <div className="form-group">
                <label>이름</label>
                <input type="text" value={name} readOnly/>
            </div>

            <div className="form-group">
                <label>아이디</label>
                <input type="text" value={userId} readOnly/>
            </div>

            <div className="form-group">
                <label>이메일주소</label>
                <div className="form-update">
                    <input type="email" value={email} readOnly/>
                    <button type="submit">수정</button>
                </div>
            </div>

            <div className="form-group">
                <label>생년월일</label>
                <input type="text" maxLength="6" value={birthday} readOnly/>
            </div>

            <div className="form-group">
                <label>휴대전화</label>
                <div className="form-update">
                    <input type="phone" maxLength="11" value={phone}/>
                    <button type="submit">수정</button>
                </div>
            </div>
            <button style={{marginTop:"50px",marginLeft:"520px", marginBottom:"30px"}}>회원탈퇴</button>
        </div>
        </>
    )
}
export default InfoDetail;