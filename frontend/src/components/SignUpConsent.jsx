import React, { useState, useEffect } from "react";
import "./SignUpConsent.css";

function SignUpConsent ( {onNext} ){

    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [allAgree, setAllAgree] = useState(false);

    const isAllRequiredChecked = agreePrivacy && agreeTerms;

    const handleAllAgreeChange  = (e) => {
        const checked = e.target.checked;
        setAllAgree(checked);
        setAgreePrivacy(checked);
        setAgreeTerms(checked);
    };

    useEffect(() => {
        setAllAgree(agreePrivacy && agreeTerms);
    }, [agreePrivacy, agreeTerms]);

    const handleSubmit = (e) => {
        e.preventDefault();

        onNext();
    };

    return(
        <>
            <form className="signup-consent" onSubmit={handleSubmit}>
                <section className="card-all-agree">
                    <label className="check">
                        <input
                            type="checkbox"
                            checked={allAgree}
                            onChange={handleAllAgreeChange}
                        />
                        <span className="label-text">전체 동의</span>
                    </label>
                </section>

                <section className="card">
                    <label className="check">
                        <input 
                            type="checkbox"
                            name="agreePrivacy"
                            checked={agreePrivacy}
                            onChange={(e) => setAgreePrivacy(e.target.checked)}
                        />
                        <span className="label-text">[필수] 개인정보 수집 및 이용</span>
                    </label>
                        <div className="box">
                            <p>
                                    사이트에서는 서비스 운영에 필요한 최소한의 개인정보를 수집하며,
                                서비스 이용을 위하여 개인정보가 추가로 필요한 경우 회원에게 별도의 동의를 받은 후
                                개인정보를 수집할 예정입니다.
                                회사가 수집하는 개인정보의 항목, 방법 및 수집 목적은 아래와 같습니다.
                            </p>
                        </div>
                </section>

                <section className="card">
                    <label className="check">
                        <input 
                            type="checkbox"
                            name="agreeTerms"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                        />
                        <span className="label-text">[필수] 이용약관</span>   
                    </label>
                        <div className="box">
                            <p>
                                    정보통신망 이용촉진 및 정보보호 등에 관한 법률(정보통신망법)에 따라
                                불법정보 유통, 명예훼손, 차별·혐오 표현, 허위사실 유포 등은
                                금지됩니다.
                            </p>
                        </div>
                </section>
                <div>
                    <button 
                        type="submit" 
                        className="nextBtn"
                        disabled={!isAllRequiredChecked}
                    >
                        다음
                    </button>
                </div>
            </form>
        </>
    );
}

export default SignUpConsent;