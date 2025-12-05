import React, { useState } from "react";
import { verifyUser, resetPassword } from "../api/AuthAPI";
import "./find.css";
import { useNavigate } from "react-router-dom";

function FindPassword() {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [verified, setVerified] = useState(false);

    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);

    const handleVerify = () => {
        setError("");

        if (!id || !email) {
            setError("아이디와 이메일을 모두 입력해주세요.");
            return;
        }

        verifyUser(id, email)
            .then(() => {
                setVerified(true);
                setStep(2);
            })
            .catch((err) => {
                const msg =
                    err.response?.data || "입력하신 정보와 일치하는 회원을 찾을 수 없습니다.";
                    setError(msg);
                });
    };

    const isPassword = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const handleReset = () => {
        setError("");

        if (!newPw || !confirmPw) {
            setError("새 비밀번호를 모두 입력해주세요.");
            return;
        }

        if (!isPassword.test(newPw)) {
            setError("비밀번호는 영소문자 + 숫자 포함 8자 이상이어야 합니다.");
            return;
        }

        if (newPw !== confirmPw) {
            setError("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        resetPassword(id, email, newPw)
            .then(() => {
                alert("비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요.");
                navigate("/auth/login")
            })
            .catch((err) => {
                const msg =
                    err.response?.data || "비밀번호를 재설정하는 중 오류가 발생했습니다.";
                    setError(msg);
            });
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">비밀번호 찾기</h2>

            <p className="auth-subtitle">
                가입하신 <span className="accent-text">아이디와 이메일</span>을
                입력하면 새 비밀번호를 설정할 수 있어요.
            </p>

        <div className="auth-steps">
            <div className={`step-item ${step >= 1 ? "active" : ""}`}>
                <span className="step-circle">1</span>
                <span className="step-text">본인 확인</span>
            </div>
            <div className="step-divider" />
                <div className={`step-item ${step >= 2 ? "active" : ""}`}>
                <span className="step-circle">2</span>
                <span className="step-text">새 비밀번호 설정</span>
            </div>
        </div>

        {!verified ? (
          <>
            <div className="auth-field">
              <label>아이디</label>
              <input
                type="text"
                placeholder="아이디를 입력하세요"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="auth-input"
              />
            </div>

            <div className="auth-field">
              <label>이메일 주소</label>
              <input
                type="email"
                placeholder="example@poppop.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
              />
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button
              type="button"
              className="auth-btn primary"
              onClick={handleVerify}
            >
              본인 확인
            </button>
          </>
        ) : (
          <>
            <div className="auth-field">
              <label>새 비밀번호</label>
              <input
                type="password"
                placeholder="새 비밀번호를 입력하세요(영소문자 + 숫자 포함 8자 이상)"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className="auth-input"
              />
            </div>

            <div className="auth-field">
              <label>새 비밀번호 확인</label>
              <input
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                className="auth-input"
              />
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button
              type="button"
              className="auth-btn primary"
              onClick={handleReset}
            >
              비밀번호 변경
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default FindPassword;
