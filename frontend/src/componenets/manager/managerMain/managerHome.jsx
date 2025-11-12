import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./managerHome.css";
<<<<<<< HEAD
=======
import Logout from "../../Logout";
>>>>>>> JWT/master

function ManagerHome() {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mh-wrap">
      {/* 이모티콘  */}
      <div className="mh-emoji-layer">
        <span className="emo emo-1">🍪</span>
        <span className="emo emo-2">📚</span>
        <span className="emo emo-3">🛍️</span>
        <span className="emo emo-4">🎁</span>
        <span className="emo emo-5">🥐</span>
        <span className="emo emo-6">👠</span>
        <span className="emo emo-7">📈</span>
        <span className="emo emo-8">🧣</span>
      </div>

      <div className="mh-header">
        {/* 로고 + hover 메뉴 */}
        <div
          className="mh-logo-wrap"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <h1 className="mh-logo">POPPOP</h1>

          {hover && (
            <div className="mh-menu">
              {/* POPPOP 소개 → /manager */}
              <button onClick={() => navigate("/manager")}>
                POPPOP 소개
              </button>

              {/* 팝업스토어 등록 → /manager/popup-register */}
              <button onClick={() => navigate("/manager/popup-register")}>
                팝업스토어 등록
              </button>

              {/* 나의 팝업 스토어 → /manager/mypopup */}
              <button onClick={() => navigate("/manager/mypopup")}>
                나의 팝업 스토어
              </button>
            </div>
          )}
        </div>

        {/* 로그아웃 */}
<<<<<<< HEAD
        <div className="mh-logout">logout</div>
=======
        <div className="mh-logout">
          <Logout/>
        </div>
>>>>>>> JWT/master
      </div>

      <div className="mh-main">
        <h2 className="mh-title">대한민국 유일의 팝업스토어 전문 플랫폼</h2>
        <h1 className="mh-brand">POPPOP</h1>
        <p className="mh-desc">
          대한민국 유일의 팝업스토어 전문 플랫폼 팝찹에서는<br/>
          고객경험 마케팅의 최정상에 자리잡은 팝업스토어의 홍보, 성과관리 등<br />
          필요한 서비스와 솔루션을 제공합니다 ✨
        </p>
      </div>
    </div>
  );
}

export default ManagerHome;