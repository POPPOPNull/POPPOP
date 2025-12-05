import React, { useEffect, useState } from "react";
import "./MyInfoDetail.css";
import { selectInfo } from "../../api/MyInfoAPI";
import { updateEmail, updatePhone, updatePassword } from "../../api/MyInfoAPI";

function InfoDetail() {
  const [name, setName] = useState("");
  const [Id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState(null);

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
      setIsEditingEmail(false);
    } catch (err) {
      console.error("이메일 수정 실패:", err);
      alert("이메일 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 휴대전화 수정
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

  const openPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setIsPwModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPwModalOpen(false);
  };

  // 비밀번호 변경 저장
  const handlePasswordSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("모든 항목을 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("새 비밀번호와 비밀번호 재확인이 일치하지 않습니다.");
      return;
    }

    try {
      await updatePassword(currentPassword, newPassword);

      alert("비밀번호가 변경되었습니다.");
      setIsPwModalOpen(false);
    } catch (err) {
      console.error("비밀번호 변경 실패:", err);
      const msg =
        err.response?.data ||
        "비밀번호 변경에 실패했습니다. 현재 비밀번호를 다시 확인해주세요.";
      setPasswordError(msg);
    }
  };

  return (
    <>
    <div className="infoForm">
      <div style={{ height: "40px" }}></div>
      {error && <p className="info-error">{error}</p>}


      <div className="form-group name-group">
        <label>이름</label>
        <input
          type="text"
          value={name}
          readOnly
          className="input-box"
        />
      </div>

      <div className="form-group">
        <label>아이디</label>
        <input type="text" value={Id} readOnly />
      </div>

      <div className="form-group">
        <div className="label-row">
          <label>이메일주소</label>
          {isEditingEmail && (
            <span className="guide-text">(예: example@poppop.com)</span>
          )}
        </div>

        <div className="form-update">
          <input
            type="email"
            value={email}
            readOnly={!isEditingEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="button"
            className={`edit-btn ${isEditingEmail ? "editing" : ""}`}
            onClick={handleEmailButtonClick}
          >
            {isEditingEmail ? "저장" : "수정"}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>생년월일</label>
        <input type="text" value={birthDate} readOnly />
      </div>

      <div className="form-group">
        <div className="label-row">
          <label>휴대전화</label>
          {isEditingPhone && (
            <span className="guide-text">(예: 01012345678)</span>
          )}
        </div>

        <div className="form-update">
          <input
            type="tel"
            maxLength="11"
            value={phone}
            readOnly={!isEditingPhone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            type="button"
            className={`edit-btn ${isEditingPhone ? "editing" : ""}`}
            onClick={handlePhoneButtonClick}
          >
            {isEditingPhone ? "저장" : "수정"}
          </button>
        </div>
      </div>

      <div className="form-group password-group">
          <div className="label-row">
            <label>비밀번호</label>
          </div>
          <div className="form-update">
            {/* <span className="password-placeholder">********</span> */}
            <button
              type="button"
              className="edit-btn"
              onClick={openPasswordModal}
            >
              변경
            </button>
          </div>
        </div>

      <button type="button" className="withdraw-btn">
        회원탈퇴
      </button>
    </div>

    {/* 모달 */}
    {isPwModalOpen && (
        <div className="pw-modal-backdrop">
          <div className="pw-modal">
            <h3>비밀번호 변경</h3>

            <div className="pw-field">
              <label>현재 비밀번호</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="pw-field">
              <label>새 비밀번호</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="pw-field">
              <label>새 비밀번호 재확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {passwordError && (
              <p className="pw-error">{passwordError}</p>
            )}

            <div className="pw-actions">
              <button type="button" onClick={handlePasswordSave}>
                저장
              </button>
              <button type="button" onClick={closePasswordModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default InfoDetail;