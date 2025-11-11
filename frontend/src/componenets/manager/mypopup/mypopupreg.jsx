import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManagerSidebar from "../../../layouts/managermain/manager-sidebar";
import "./mypopupreg.css";

function MyPopupReg() {
    const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    brandMain: "",
    roadAddress: "",
    detailAddress: "",
    startDate: "",
    endDate: "",
    description: "",
    hashtags: "",
  });

  useEffect(() => {
    
  }, []);

  return (
    <div className="mpr-layout">
      
      <div className="mpr-sidebar-wrap">
        <ManagerSidebar />
      </div>

      
      <div className="mpr-content-wrap">
        
        <div className="mpr-header">
          <h2 className="mpr-title">POPUP 등록</h2>
          <button className="mpr-submit-btn">등록</button>
        </div>

        
        <div className="mpr-scroll-area">
          
          <section className="mpr-section">
            <h3 className="mpr-section-title">팝업스토어 기본 *</h3>

            
            <div className="mpr-field-col">
              <label className="mpr-label">카테고리 선택 *</label>
              <select
                className="mpr-input mpr-select"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">카테고리 선택</option>
                <option value="뷰티">뷰티</option>
                <option value="패션">패션</option>
                <option value="키즈">키즈</option>
                <option value="전시">전시</option>
                <option value="게임">게임</option>
                <option value="굿즈">굿즈</option>
                <option value="기타">기타</option>
              </select>

              <input
                className="mpr-input"
                type="text"
                placeholder="팝업스토어 타이틀을 입력해주세요"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            
            <div className="mpr-field-col">
              <label className="mpr-label">브랜드 *</label>
              <input
                className="mpr-input"
                type="text"
                placeholder="메인 *"
                value={formData.brandMain}
                onChange={(e) =>
                  setFormData({ ...formData, brandMain: e.target.value })
                }
              />
            </div>

            <div className="mpr-field-col">
              <label className="mpr-label">주소</label>

              <div className="mpr-row">
                <input
                  className="mpr-input"
                  type="text"
                  placeholder="도로명*"
                  value={formData.roadAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, roadAddress: e.target.value })
                  }
                />
                <button className="mpr-small-btn" type="button">
                  검색
                </button>
              </div>

              <input
                className="mpr-input"
                type="text"
                placeholder="상세주소"
                value={formData.detailAddress}
                onChange={(e) =>
                  setFormData({ ...formData, detailAddress: e.target.value })
                }
              />
            </div>

            <div className="mpr-field-col">
              <label className="mpr-label">기간 *</label>

              <div className="mpr-row">
                <input
                  className="mpr-input"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
                <span className="mpr-tilde">~</span>
                <input
                  className="mpr-input"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>
          </section>

          <section className="mpr-section">
            <h3 className="mpr-section-title">영업시간</h3>

            <div className="mpr-hours-wrap">
              
              <div className="mpr-hours-row">
                <div className="mpr-hours-day">전체</div>

                <input
                  className="mpr-input mpr-time"
                  type="time"
                  placeholder="오픈시간"
                />
                <input
                  className="mpr-input mpr-time"
                  type="time"
                  placeholder="마감시간"
                />

                <button className="mpr-small-btn" type="button">
                  일괄적용
                </button>
              </div>

              {["월","화","수","목","금","토","일"].map((day) => (
                <div className="mpr-hours-row" key={day}>
                  <div className="mpr-hours-day">{day}</div>

                  <input
                    className="mpr-input mpr-time"
                    type="time"
                    placeholder="오픈시간"
                  />
                  <input
                    className="mpr-input mpr-time"
                    type="time"
                    placeholder="마감시간"
                  />

                  <button className="mpr-small-btn" type="button">
                    휴무일
                  </button>
                </div>
              ))}
            </div>

            <div className="mpr-field-col">
              <label className="mpr-label">휴일 공지사항</label>
              <input
                className="mpr-input"
                type="text"
                placeholder="정기휴무 및 휴일이 있다면 작성해주세요. (예: 1/1 휴무)"
              />
            </div>
          </section>

          <section className="mpr-section">
            <h3 className="mpr-section-title">사전예약정보 *</h3>

            <div className="mpr-field-col">
              <div className="mpr-row space-between">
                <label className="mpr-label">사전예약 여부</label>
                <input type="checkbox" />
              </div>

              <div className="mpr-row">
                <input className="mpr-input" type="date" />
                <span className="mpr-tilde">~</span>
                <input className="mpr-input" type="date" />
              </div>
            </div>

            <div className="mpr-field-col">
              <div className="mpr-row space-between">
                <label className="mpr-label">사전예약 여부</label>
                <input type="checkbox" />
              </div>

              <div className="mpr-row">
                <input
                  className="mpr-input mpr-time"
                  type="time"
                  placeholder="예약 시작 시간"
                />
                <input
                  className="mpr-input mpr-time"
                  type="time"
                  placeholder="예약 종료 시간"
                />
              </div>

              <div className="mpr-row">
                {/* <input
                  className="mpr-input"
                  type="text"
                  placeholder="예약 시간 단위 (ex) 30분, 1시간"
                /> */}
            
              </div>
            </div>
          </section>

          
          <section className="mpr-section">
            <h3 className="mpr-section-title">홈페이지 링크</h3>
            <input
              className="mpr-input"
              type="text"
              placeholder="홈페이지 링크(URL)를 입력해주세요"
            />

            <h3 className="mpr-section-title">해시태그</h3>
            <input
                className="mpr-input"
                type="text"
                placeholder="#성수 #팝업 형식으로 입력해주세요"
                value={formData.hashtags || ""}

                onChange={(e) => {
                    const inputValue = e.target.value;
                    setFormData({
                    ...formData,
                    hashtags: inputValue,
                     hashtagsArray: inputValue
                    .split("#")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag !== ""),
                });
                }}
                />

            <h3 className="mpr-section-title">팝업설명/안내사항/주의사항</h3>
            <textarea
              className="mpr-textarea"
              placeholder="팝업설명/안내사항/주의사항을 함께 작성해주세요"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </section>

          <section className="mpr-section">
            <h3 className="mpr-section-title">특징/환경/제약사항</h3>

            <div className="mpr-tags-wrap">
              {[
                "주차 가능",
                "주차불가",
                "입장료 유료",
                "입장료 무료",
                "반려동물",
                "반려동물 입장금지",
                "키즈존",
                "노키즈존",
                "식음료 반입 금지",
                "19세 이상",
                "와이파이",
                "사진촬영 가능",
              ].map((tag) => (
                <button className="mpr-tag-btn" type="button" key={tag}>
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section className="mpr-section">
            <h3 className="mpr-section-title">팝업스토어 이미지 *</h3>

            <div className="mpr-guide-box">
            <p className="mpr-email-guide">
                첨부할 포스터나 이미지를 이메일로 보내주세요! 📩<br />
            <strong>이메일 주소:</strong> 
            <span className="mpr-email">poppop.admin@gmail.com</span>
         </p>
        </div>
        </section>

        </div>
      </div>
    </div>
  );
}

export default MyPopupReg;
