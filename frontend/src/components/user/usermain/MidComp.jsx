import { Swiper, SwiperSlide } from "swiper/react";
import MCStyle from "./MidComp.module.css"

import { useState,useEffect } from "react";
import PopupComp from "./PopupComp";
import { selectAllPopupStore, selectPopupRandomly } from "../../../api/PopupStoreAPI";
import { logDataBySelect } from "../../../api/BehaviorAPI";
import { Link } from "react-router-dom";




const month = new Date().getMonth()+1;
export function MidComp1(){

    const [popups, setPopups] = useState([])
    

    useEffect(()=>{
        const fetchData = async()=>{
            const data = await selectAllPopupStore()
            const length = data.length

            const data2 = await selectPopupRandomly(7,length)
            setPopups(data2)
            const array = new Array()
            for (let i = 0 ; i < data2.length;i++){
                array.push(data2[i].no)
            }
            console.log("중단1",array)
            logDataBySelect(array)

        }
        fetchData()
    },[])
    

    return(
        <>
        <div className={MCStyle.back}>
            <div className={MCStyle.explain}>담당자 픽 인기 팝업 <span style={{color:"red"}}>{month}월</span>
            
            <div className={MCStyle.midmoreback}>
            <Link to={"/popup-stores/search"} style={{ textDecoration: 'none', color: 'inherit' }} >
                <div className={MCStyle.midmore}>더보기</div>
            </Link>
            </div>
            
            </div>
            <div>
                <Swiper
            slidesPerView={3}
            className={MCStyle.layout}
            spaceBetween={10}
            slidesOffsetBefore={30}
            slidesOffsetAfter={100}
            >
            {popups.map(popupstore =><SwiperSlide  className={MCStyle.slide}><PopupComp key={popupstore.no} popupstore={popupstore} posterNo={popupstore.no}/></SwiperSlide>)}
            </Swiper>
            </div>
        </div>
        </>
    )
}
export function MidComp2(){

    const [popups, setPopups] = useState([])
    
    useEffect(()=>{
        const fetchData = async()=>{
            const data = await selectAllPopupStore()
            const length = data.length

            const data2 = await selectPopupRandomly(7,length)
            setPopups(data2)
            const array = new Array()
            for (let i = 0 ; i < data2.length;i++){
                array.push(data2[i].no)
            }
            console.log("중단2",array)
            logDataBySelect(array)

        }
        fetchData()
    },[])


    return(
        <>
        <div className={MCStyle.back}>
            <div className={MCStyle.explain}>놓치면 손해 곧 오픈 예정! <span style={{color:"red"}}>{month}월</span>
            
            <div className={MCStyle.midmoreback}>
            <Link to={"/popup-stores/search"} style={{ textDecoration: 'none', color: 'inherit' }} >
                <div className={MCStyle.midmore}>더보기</div>
            </Link>
            </div>

            </div>
            <div>
                <Swiper
            slidesPerView={3}
            className={MCStyle.layout}
            spaceBetween={10}
            slidesOffsetBefore={30}
            slidesOffsetAfter={100}
            >
            {popups.map(popupstore =><SwiperSlide  className={MCStyle.slide}><PopupComp key={popupstore.no} popupstore={popupstore} posterNo={popupstore.no}/></SwiperSlide>)}
            </Swiper>
            </div>
        </div>
        </>
    )
}

