import "../usermain/main.css";
import "./MapBody.css";
import { useEffect, useState } from "react";
import KakaoMap from "../../components/maps/Map";
import NearComp from "../../components/NearComp";
import { MidComp1 } from "../../components/user/usermain/MidComp";
import { selectAllPopupStore } from "../../api/PopupStoreAPI";
import Footer from "../usermain/Footer";

function MapBody (){

  const [popupStores, setPopupStores] = useState([]);

  useEffect(() => {
    selectAllPopupStore()
      .then((data) => {
        console.log("팝업스토어:", data);
        setPopupStores(data || []);
      })
      .catch((err) => {
        console.error("팝업스토어 위치 조회 실패:", err);
      });
  }, []);

    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="map">
                    <KakaoMap popupStores={popupStores}/>
                    </div>
                    <MidComp1/>
                    {/* <NearComp/> */}
                    <div style={{ height: "30px" }}></div>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default MapBody;