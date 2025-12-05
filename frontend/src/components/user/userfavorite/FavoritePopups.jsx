import { useEffect, useRef, useState } from "react"
import PopupStores from "../../PopupStores"
import {selectFavoritePopupStoreById } from "../../../api/PopupStoreAPI"
import FPStyle from "./FP.module.css"
import { useDrag, useDrop } from "react-dnd"
import { deleteFavorite } from "../../../api/FavoriteAPI"
import { Link } from "react-router-dom"


function NoFavorite(){
    return(
        <>
        <div className={FPStyle.nofavorite}>
            <div className={FPStyle.nflayout}>
                <div style={{color:"lightgray"}}>아직 관심 팝업이 없어요</div>
                <div style={{fontSize:20}}>기대되신다면 관심추가로 챙겨보세요!</div>
                <Link to={"/popup-stores/search"} style={{textDecoration:"none",color:"inherit"}}>
                    <div className={FPStyle.gosearch}>팝업 보러가기</div>
                </Link>
            </div>
        </div>
        </>
    )
}




function FavoritePopups(){

        const [popupStores, setPopupStores] = useState([])
        const [id ,setId] = useState("")
        const [isDrag, setIsDrag] = useState(false)
        const [isDrop, setIsDrop] = useState(false)
        const [length, setLength] = useState();
        
    
        useEffect(()=>{
            const fetchData = async () =>{
            //     selectFavoritePopupStoreById(id).then(data=>{
                
            //     setPopupStores(data)
                
            //     setLength(data.length)
            // })  
            const data = await selectFavoritePopupStoreById(id);
            console.log("data",data)
            setPopupStores(data)
            console.log("length",data.length)
            setLength(data.length)
            }   
            fetchData()
        },[length])

        const [,drop] = useDrop({
            accept : 'popup',
            hover(item){
                console.log(item.popupstore.no,'삭제할래?')
            },
            drop(item){
                deleteFavorite(item.popupstore.no)
                console.log('삭제 완')
                setIsDrop(!isDrop)
                window.location.reload()
            }
            
        })
    
    
    
    return(
        <>
            <div className={FPStyle.title}>
                {(length!=0)?"내 관심 팝업스토어":""}
                    <div className={FPStyle.length}>
                        {(length==0)?"":length}
                    </div>
            </div>
            
            <div className={FPStyle.botlayout}>
                {popupStores.length==0?<NoFavorite/>:popupStores.map(popupstores =><PopupStores key={popupstores.no} popupstore={popupstores} posterNo={popupstores.no} setIsDrag={setIsDrag}/>)}
            </div>
                {isDrag&&<div className={FPStyle.dropdelete} ref={drop}>삭제</div>}
        </>
    )
}

export default FavoritePopups;