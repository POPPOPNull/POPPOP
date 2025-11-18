DROP TABLE IF EXISTS user_event_data;
DROP TABLE IF EXISTS session_info;
DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS special_notes;
DROP TABLE IF EXISTS popup_store;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS refresh_token;

-- =========================================
-- 1. member (회원)
-- =========================================
CREATE TABLE member (
                        id          VARCHAR(50)  PRIMARY KEY,
                        password    VARCHAR(100) NOT NULL,
                        name        VARCHAR(30)  NOT NULL,
                        phone       VARCHAR(15)  NOT NULL,
                        role        VARCHAR(20)  NOT NULL,
                        email       VARCHAR(255),
                        business_no VARCHAR(20),
                        gender      CHAR(1),
                        birth_date  DATE,
                        signup_date DATE DEFAULT (CURRENT_DATE) COMMENT '회원가입 날짜',
                        status      ENUM('회원', '탈퇴') DEFAULT '회원' COMMENT '회원 상태',
                        CONSTRAINT chk_manager_business_no
                            CHECK (role <> 'manager' OR business_no IS NOT NULL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE INDEX idx_member_role ON member(role);

-- =========================================
-- 2. admin (관리자)
-- =========================================
CREATE TABLE admin (
                       id       VARCHAR(30)  PRIMARY KEY,
                       password VARCHAR(100) NOT NULL,
                       role     VARCHAR(20) DEFAULT 'ADMIN'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================
-- 3. popup_store (팝업 스토어)
-- =========================================
CREATE TABLE popup_store (
                             popup_no            INT AUTO_INCREMENT PRIMARY KEY,
                             popup_name          VARCHAR(100) NOT NULL,
                             brand_name          VARCHAR(100) NOT NULL,
                             popup_start_date    DATE NOT NULL,
                             popup_end_date      DATE NOT NULL,
                             open_time           TIME NOT NULL,
                             close_time          TIME NOT NULL,
                             popup_location      VARCHAR(200) NOT NULL,
                             latitude            DECIMAL(10,6),
                             longitude           DECIMAL(10,6),
                             reservable_status   BOOLEAN NOT NULL,
                             popup_explanation   VARCHAR(255),
                             approval_status     VARCHAR(5) NOT NULL,
                             rejection_reason    VARCHAR(30),
                             id                  VARCHAR(50) NOT NULL,
                             click_count         INT DEFAULT 0,
                             category_name       VARCHAR(5) NOT NULL,
                             advance_reservation BOOLEAN DEFAULT 0,
                             homepage_link       VARCHAR(255),
                             capacity            INT(5),
                             hashtag_name        VARCHAR(20),
                             CONSTRAINT fk_popup_store_member
                                 FOREIGN KEY (id) REFERENCES member(id)
                                     ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_popup_store_member   ON popup_store(id);
CREATE INDEX idx_popup_store_category ON popup_store(category_name);

-- =========================================
-- 4. special_notes (특이사항)
-- =========================================
CREATE TABLE special_notes (
                               popup_no             INT      PRIMARY KEY,
                               kid_zone             BOOLEAN,
                               nokids_zone          BOOLEAN,
                               parking              BOOLEAN,
                               noparking            BOOLEAN,
                               free_admission       BOOLEAN,
                               paid_admission       BOOLEAN,
                               pet_allowed          BOOLEAN,
                               pet_not_allowed      BOOLEAN,
                               food_beverage_banned BOOLEAN,
                               adult                BOOLEAN,
                               wifi                 BOOLEAN,
                               photography_possible BOOLEAN,
                               CONSTRAINT fk_special_notes_popup
                                   FOREIGN KEY (popup_no) REFERENCES popup_store(popup_no)
                                       ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================
-- 5. review (리뷰)
-- =========================================
CREATE TABLE review (
                        review_no      INT AUTO_INCREMENT PRIMARY KEY,
                        review_content VARCHAR(200) NOT NULL,
                        popup_no       INT NOT NULL,
                        id             VARCHAR(50) NOT NULL,
                        review_date    DATE,
                        CONSTRAINT fk_review_popup
                            FOREIGN KEY (popup_no) REFERENCES popup_store(popup_no)
                                ON UPDATE CASCADE,
                        CONSTRAINT fk_review_member
                            FOREIGN KEY (id) REFERENCES member(id)
                                ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_review_popup  ON review(popup_no);
CREATE INDEX idx_review_member ON review(id);

-- =========================================
-- 6. reservation (예약)
-- =========================================
CREATE TABLE reservation (
                             reservation_no        INT AUTO_INCREMENT PRIMARY KEY,
                             reservation_status    VARCHAR(10) NOT NULL,
                             reservation_personnel INT(5) NOT NULL,
                             cancel_reason         VARCHAR(30),
                             popup_no              INT NOT NULL,
                             id                    VARCHAR(50) NOT NULL,
                             reservation_date      DATE NOT NULL,
                             reservation_time      TIME NOT NULL,
                             CONSTRAINT fk_reservation_popup
                                 FOREIGN KEY (popup_no) REFERENCES popup_store(popup_no)
                                     ON UPDATE CASCADE,
                             CONSTRAINT fk_reservation_member
                                 FOREIGN KEY (id) REFERENCES member(id)
                                     ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_reservation_member ON reservation(id);
CREATE INDEX idx_reservation_popup  ON reservation(popup_no);

-- =========================================
-- 7. favorite (관심목록) - 수정
--    favorite_no 제거, (popup_no, id) 복합 PK
-- =========================================
CREATE TABLE favorite (
                          popup_no INT NOT NULL,
                          id       VARCHAR(50) NOT NULL,
                          PRIMARY KEY (popup_no, id),
                          CONSTRAINT fk_favorite_popup
                              FOREIGN KEY (popup_no) REFERENCES popup_store(popup_no)
                                  ON UPDATE CASCADE,
                          CONSTRAINT fk_favorite_member
                              FOREIGN KEY (id) REFERENCES member(id)
                                  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================
-- 8. session_info (접속 정보)
-- =========================================
CREATE TABLE session_info (
                              session_id VARCHAR(64) PRIMARY KEY,
                              id         VARCHAR(50) NOT NULL,
                              CONSTRAINT fk_session_member
                                  FOREIGN KEY (id) REFERENCES member(id)
                                      ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_session_member ON session_info(id);

-- =========================================
-- 9. user_event_data (사용자 행동 데이터)
-- =========================================
CREATE TABLE user_event_data (
                                 event_data_no INT AUTO_INCREMENT PRIMARY KEY,
                                 session_id    VARCHAR(64) NOT NULL,
                                 event_type    VARCHAR(50) NOT NULL,
                                 event_value   VARCHAR(255) NOT NULL,
                                 time_stamp    DATETIME NOT NULL,
                                 page          VARCHAR(10),
                                 page_zone     VARCHAR(10),
                                 page_zone_no  VARCHAR(20),
                                 CONSTRAINT fk_event_session
                                     FOREIGN KEY (session_id) REFERENCES session_info(session_id)
                                         ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_user_event_session ON user_event_data(session_id);
CREATE INDEX idx_user_event_type   ON user_event_data(event_type);

-- =========================================
-- 10. refresh_token (refresh 토큰)
-- =========================================
CREATE TABLE refresh_token
(
    `id`   INT AUTO_INCREMENT COMMENT 'token ID',
    principal_id VARCHAR(30) NOT NULL, -- 실제 사용자의 PK
    principal_type VARCHAR(10) NOT NULL, -- 'MEMBER' 또는 'ADMIN'
    token  VARCHAR(255) NOT NULL UNIQUE COMMENT 'refresh 토큰',
    expiry_date DATETIME NOT NULL COMMENT '만료 일자',
    PRIMARY KEY ( `id` )
)
    ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

