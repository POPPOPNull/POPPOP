import { Swiper, SwiperSlide } from "swiper/react";
import MCStyle from "./MidComp.module.css"

import { useState,useEffect } from "react";
import PopupComp from "./PopupComp";
import { selectPopupRandomly } from "../../../api/PopupStoreAPI";




export function MidComp1(){

    const [popups, setPopups] = useState([])

    useEffect(()=>{
        selectPopupRandomly()
        .then(data=>{
            console.log("randompopup",data)
            setPopups(data)
            
        })
    },[])
    

    return(
        <>
        <div className={MCStyle.explain}>중단컴포넌트 주제 1</div>
            <Swiper
            slidesPerView={3}
            className={MCStyle.layout}
            spaceBetween={10}
            slidesOffsetAfter={200}
            >
            {popups.map(popupstore =><SwiperSlide  className={MCStyle.slide}><PopupComp key={popupstore.no} popupstore={popupstore}/></SwiperSlide>)}
            </Swiper>
        </>
    )
}
export function MidComp2(){

        const [popups, setPopups] = useState([])

    useEffect(()=>{
        selectPopupRandomly()
        .then(data=>{
            console.log("randompopup",data)
            setPopups(data)
            
        })
    },[])


    return(
        <>
        <div className={MCStyle.explain}>중단컴포넌트 주제 2</div>
            <Swiper
            slidesPerView={3}
            className={MCStyle.layout}
            spaceBetween={10}
            slidesOffsetAfter={200}
            >
            {popups.map(popupstore =><SwiperSlide  className={MCStyle.slide}><PopupComp key={popupstore.no} popupstore={popupstore}/></SwiperSlide>)}
            </Swiper>
        </>
    )
}

