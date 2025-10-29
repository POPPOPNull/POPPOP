import { useEffect,useState } from "react"
import { locationCoordExchange, selectPopupStoreDetails } from "../../api/PopupStoreAPI"
import { useParams } from "react-router-dom";
import KakaoMap from "../../componenets/Maps";



function Popups(){

    const {popupNo} = useParams();

    const [popup, setPopup] = useState({});

    const [coord, setCoord] = useState({
        lat:"",
        lng:""
    })

    useEffect(()=>{
        selectPopupStoreDetails(popupNo)
        .then(data=>{
            console.log("data",data)
            setPopup(data)
        })    
        console.log(popup.location)

        
    },[])


    useEffect(()=>{

        locationCoordExchange(popup.location)
        .then(data => {
            console.log(data)
            setCoord({
                lat:data.documents[0].y,
                lng:data.documents[0].x
            })
            console.log(coord)
        })
    },[popup])



    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="blank"></div>
                    <div>{popup.no}의 상세페이지</div>
                    <KakaoMap props={coord}/>               
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
        </>
    )
}

export default Popups