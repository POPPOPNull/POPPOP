import React, { useState } from "react";
import { findId } from "../api/AuthAPI";
import "./find.css";
import { Link } from "react-router-dom";

function FindId() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleFind = () => {
    setResult("");
    setError("");

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    findId(email)
      .then((id) => {
        setResult(id);
      })
      .catch((err) => {
        const msg = err.response?.data || "아이디를 찾는 중 오류가 발생했습니다.";
        setError(msg);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">아이디 찾기</h2>
        <p className="auth-subtitle">
          회원가입 시 등록한 <span className="accent-text">이메일 주소</span>로
          아이디를 찾을 수 있어요.
        </p>

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

        <button type="button" className="auth-btn primary" onClick={handleFind}>
          아이디 찾기
        </button>

        {result && (
          <div className="auth-result-box">
            <p className="auth-result-value">{result}</p>
          </div>
        )}
        <div className="bottom-links">
            <Link to="/find-password" className="link">
              비밀번호 찾기
            </Link>
            <span>|</span>
            <Link to="/auth/login" className="link">
              로그인
            </Link>
          </div>
      </div>
    </div>
  );
}

export default FindId;
