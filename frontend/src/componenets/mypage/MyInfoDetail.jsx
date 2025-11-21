import React, { useEffect, useState } from "react";
import "./MyInfoDetail.css";
import { selectInfo } from "../../api/MyInfoAPI";

function InfoDetail() {

    const [name, setName] = useState("");
    const [Id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState(null);

    useEffect(() => {
    selectInfo()
      .then((data) => {

        setName(data.name);
        setId(data.id);
        setEmail(data.email);
        setBirthDate(data.birthDate);
        setPhone(data.phone);
      })
      .catch((err) => {
        console.error("회원 정보 조회 실패:", err);
        setError("회원 정보를 불러오는 데 실패했습니다.");
      });
  }, []);

    return(

        <>
        <div className="infoForm">
            <div className="form-group">
                <label>이름</label>
                <input type="text" value={name} readOnly/>
            </div>

            <div className="form-group">
                <label>아이디</label>
                <input type="text" value={Id} readOnly/>
            </div>

            <div className="form-group">
                <label>이메일주소</label>
                <div className="form-update">
                    <input type="email" value={email} readOnly/>
                    <button type="button">수정</button>
                </div>
            </div>

            <div className="form-group">
                <label>생년월일</label>
                <input type="text" value={birthDate} readOnly/>
            </div>

            <div className="form-group">
                <label>휴대전화</label>
                <div className="form-update">
                    <input type="phone" maxLength="11" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    <button type="button">수정</button>
                </div>
            </div>
            <button style={{marginTop:"50px",marginLeft:"520px", marginBottom:"30px"}}>회원탈퇴</button>
        </div>
        </>
    )
}
export default InfoDetail;