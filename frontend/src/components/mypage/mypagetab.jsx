import React from "react";
import { NavLink } from "react-router-dom";
import "./mypagetab.css";

function Tab() {
  return (
    <div className="tab-wrapper">
      <ul className="tabs">
        <li>
          <NavLink 
            to="/myinfo"
            className={({ isActive }) =>
              isActive ? "tab-link active" : "tab-link"
            }
          >
            회원정보
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/myreview"
            className={({ isActive }) =>
              isActive ? "tab-link active" : "tab-link"
            }
          >
            리뷰
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/myreservation"
            className={({ isActive }) =>
              isActive ? "tab-link active" : "tab-link"
            }
          >
            예약확인
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Tab;
