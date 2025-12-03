import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMyPopupDetail, updatePopup } from "../../../api/ManagerAPI";
import ManagerSidebar from "../../../layouts/managermain/manager-sidebar";
import "./mypopupreg.css";

function MyPopupEdit() {
  const navigate = useNavigate();
  const { popupNo } = useParams(); // 어떤 팝업 수정인지

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    brandMain: "",
    roadAddress: "",
    detailAddress: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [dailyHours, setDailyHours] = useState(
    ["월", "화", "수", "목", "금", "토", "일"].map(() => ({
      open: "",
      close: "",
    }))
  );

  const [submitting, setSubmitting] = useState(false); // 중복 클릭 방지
  const [selectedTags, setSelectedTags] = useState([]);

  const [hashtagsInput, setHashtagsInput] = useState("");
  const [hashtagsList, setHashtagsList] = useState([]);
  const isComposingRef = useRef(false);

  const normalizeTag = (raw) =>
    raw
      .replaceAll(",", " ")
      .trim()
      .replace(/^#+/, "")
      .replace(/\s+/g, "");

  const addTag = (raw) => {
    const tag = normalizeTag(raw);
    if (!tag) return;
    if (hashtagsList.length >= 10) {
      alert("해시태그는 최대 10개까지만 추가할 수 있습니다.");
      return;
    }
    if (hashtagsList.includes(tag)) return;
    setHashtagsList((prev) => [...prev, tag]);
  };

  const removeTag = (tag) => {
    setHashtagsList((prev) => prev.filter((t) => t !== tag));
  };

  const handleHashtagChange = (e) => {
    const value = e.target.value.replace(/^#+/, "");
    setHashtagsInput(value);
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (e) => {
    isComposingRef.current = false;
    setHashtagsInput(e.target.value.replace(/^#+/, ""));
  };

  const handleHashtagKeyDown = (e) => {
    if (e.key === "Backspace" && hashtagsInput === "" && hashtagsList.length) {
      e.preventDefault();
      setHashtagsList((prev) => prev.slice(0, -1));
      return;
    }

    if (isComposingRef.current) return;

    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const val = hashtagsInput.trim();
      if (val) addTag(val);
      setHashtagsInput("");
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : [...prev, tag]
    );
  };

  // 기존 데이터 불러오기
  useEffect(() => {
    const loadPopup = async () => {
      try {
        const data = await fetchMyPopupDetail(popupNo);

        setFormData({
          category: data.categoryName || "",
          title: data.name || "",
          brandMain: data.brandName || "",
          roadAddress: data.location || "",
          detailAddress: "",
          startDate: data.startDate || "",
          endDate: data.endDate || "",
          description: data.explanation || "",
        });

        if (data.openTime) setOpenTime(data.openTime.slice(0, 5));
        if (data.closeTime) setCloseTime(data.closeTime.slice(0, 5));

        if (data.hashtagName) {
          const parsed = data.hashtagName
            .split(" ")
            .map((t) => t.replace(/^#+/, ""))
            .filter((t) => t);
          setHashtagsList(parsed);
        }
      } catch (err) {
        console.error("팝업 상세 조회 실패:", err);
        alert("팝업 정보를 불러오는 데 실패했습니다.");
        navigate("/manager/mypopup");
      }
    };

    loadPopup();
  }, [popupNo, navigate]);

  // 수정 제출
  const handleSubmit = () => {
    if (submitting) return;

    if (
      !formData.category ||
      !formData.title ||
      !formData.brandMain ||
      !formData.roadAddress ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.description
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    const payload = {
      name: formData.title.trim(),
      brandName: formData.brandMain.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      openTime: openTime ? `${openTime}:00` : null,
      closeTime: closeTime ? `${closeTime}:00` : null,
      location: `${formData.roadAddress} ${formData.detailAddress || ""}`.trim(),
      reservableStatus: 1,
      explanation: formData.description.trim(),
      categoryName: formData.category,
      hashtagName: hashtagsList.length
        ? hashtagsList.map((t) => `#${t}`).join(" ")
        : "",
    };

    setSubmitting(true);

    updatePopup(popupNo, payload)
      .then(() => {
        alert("팝업 정보가 수정되었습니다.");
        navigate(`/manager/mypopup/${popupNo}/detail`);
      })
      .catch((err) => {
        console.error("팝업 수정 에러:", err);
        const msg = err?.response?.data || "수정 중 오류가 발생했습니다.";
        alert(msg);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="mpr-layout">
      <div className="mpr-sidebar-wrap">
        <ManagerSidebar />
      </div>

      <div className="mpr-content-wrap">
        <div className="mpr-header">
          {/* <h2 className="mpr-title">나의 팝업스토어 &gt; 수정</h2> */}

          <button
            className="mpr-submit-btn"
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "수정 중..." : "수정"}
          </button>
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
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                />
                <input
                  className="mpr-input mpr-time"
                  type="time"
                  placeholder="마감시간"
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                />

                <button
                  className="mpr-small-btn"
                  type="button"
                  onClick={() => {
                    setDailyHours(
                      dailyHours.map(() => ({
                        open: openTime,
                        close: closeTime,
                      }))
                    );
                    alert("모든 요일에 동일한 시간이 적용되었습니다!");
                  }}
                >
                  일괄적용
                </button>
              </div>

              {["월", "화", "수", "목", "금", "토", "일"].map((day, idx) => (
                <div className="mpr-hours-row" key={day}>
                  <div className="mpr-hours-day">{day}</div>

                  <input
                    className="mpr-input mpr-time"
                    type="time"
                    placeholder="오픈시간"
                    value={dailyHours[idx].open}
                    onChange={(e) => {
                      const updated = [...dailyHours];
                      updated[idx].open = e.target.value;
                      setDailyHours(updated);
                    }}
                  />
                  <input
                    className="mpr-input mpr-time"
                    type="time"
                    placeholder="마감시간"
                    value={dailyHours[idx].close}
                    onChange={(e) => {
                      const updated = [...dailyHours];
                      updated[idx].close = e.target.value;
                      setDailyHours(updated);
                    }}
                  />

                  <button
                    className="mpr-small-btn"
                    type="button"
                    onClick={() => {
                      const updated = [...dailyHours];
                      updated[idx] = { open: "", close: "" };
                      setDailyHours(updated);
                    }}
                  >
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

            <div className="mpr-hashtags">
              <div className="mpr-chips">
                {hashtagsList.map((tag) => (
                  <span className="mpr-chip" key={tag}>
                    #{tag}
                    <button
                      type="button"
                      className="mpr-chip-x"
                      onClick={() => removeTag(tag)}
                      aria-label={`${tag} 제거`}
                    >
                      ×
                    </button>
                  </span>
                ))}

                <input
                  className="mpr-input mpr-chip-input"
                  type="text"
                  placeholder="#태그 입력 후 Enter"
                  value={hashtagsInput}
                  onChange={handleHashtagChange}
                  onKeyDown={handleHashtagKeyDown}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                />
              </div>

              <p className="mpr-hint">
                엔터/쉼표/스페이스로 태그를 추가할 수 있어요. (최대 10개)
              </p>
            </div>

            <h3 className="mpr-section-title">
              팝업설명/안내사항/주의사항
            </h3>
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
                <button
                  key={tag}
                  type="button"
                  className={`mpr-tag-btn ${
                    selectedTags.includes(tag) ? "selected" : ""
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section className="mpr-section">
            <h3 className="mpr-section-title">팝업스토어 이미지</h3>

            <div className="mpr-guide-box">
              <p className="mpr-email-guide">
                첨부할 포스터나 이미지를 이메일로 보내주세요! 📩
                <br />
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

export default MyPopupEdit;
