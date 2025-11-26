import React, { useEffect, useState } from "react";
import "./MyInfoDetail.css";
import { selectInfo } from "../../api/MyInfoAPI";
import { updateEmail, updatePhone } from "../../api/MyInfoAPI";

function InfoDetail() {

    const [name, setName] = useState("");
    const [Id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState(null);

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);

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

    // 이메일 수정
    const handleEmailButtonClick = async () => {
        if (!isEditingEmail) {
            setIsEditingEmail(true);
        return;
        }
    
        try {
            const isEmail = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

            if (!isEmail.test(email)) {
                alert("올바른 이메일 주소를 입력해주세요. (예: example@poppop.com)");
                return;
            }
            await updateEmail(email);
            alert("이메일이 수정되었습니다.");
            setIsEditingEmail(false);   // 다시 readOnly
        } catch (err) {
            console.error("이메일 수정 실패:", err);
            alert("이메일 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handlePhoneButtonClick = async () => {
        if (!isEditingPhone) {
            setIsEditingPhone(true);
        return;
        }

        try {
            const onlyNumber = phone.replace(/\D/g, "");
            if (onlyNumber.length < 10 || onlyNumber.length > 11) {
                alert("올바른 휴대전화 번호를 입력해주세요. (숫자 10~11자리)");
                return;
            }
            await updatePhone(phone);
            alert("휴대전화 번호가 수정되었습니다.");
            setIsEditingPhone(false);
        } catch (err) {
            console.error("휴대전화 수정 실패:", err);
            alert("휴대전화 번호 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

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
                    <input 
                        type="email" 
                        value={email} 
                        readOnly={!isEditingEmail}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <button 
                        type="button"
                        className={`edit-btn ${isEditingEmail ? "editing" : ""}`}
                        onClick={handleEmailButtonClick}
                    >
                        {isEditingEmail? "저장" : "수정"}
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label>생년월일</label>
                <input type="text" value={birthDate} readOnly/>
            </div>

            <div className="form-group">
                <label>휴대전화</label>
                <div className="form-update">
                    <input 
                        type="phone" 
                        maxLength="11" 
                        value={phone}
                        readOnly={!isEditingPhone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button 
                        type="button"
                        className={`edit-btn ${isEditingPhone ? "editing" : ""}`}
                        onClick={handlePhoneButtonClick}>
                        {isEditingPhone? "저장" : "수정"}
                    </button>
                </div>
            </div>
            <button style={{marginTop:"50px",marginLeft:"520px", marginBottom:"30px"}}>회원탈퇴</button>
        </div>
        </>
    )
}
export default InfoDetail;