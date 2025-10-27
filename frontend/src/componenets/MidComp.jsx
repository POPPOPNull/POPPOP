import { Swiper, SwiperSlide } from "swiper/react";
import MCStyle from "./MidComp.module.css"


export function MidComp1(){
    return(
        <>
        <div className={MCStyle.explain}>중단컴포넌트 주제 1</div>
            <Swiper
            slidesPerView={3}
            className={MCStyle.layout}
            spaceBetween={30}
            >
                
                <SwiperSlide  className={MCStyle.slide}>팝업B1</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업B2</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업B3</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업B4</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업B5</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업B6</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업B7</SwiperSlide>
            </Swiper>
        </>
    )
}
export function MidComp2(){
    return(
        <>
        <div className={MCStyle.explain}>중단컴포넌트 주제 2</div>
            <Swiper
            slidesPerView={3}
            className={MCStyle.layout}
            spaceBetween={30}
            >
                
                <SwiperSlide  className={MCStyle.slide}>팝업C1</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업C2</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업C3</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업C4</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업C5</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업C6</SwiperSlide>
                <SwiperSlide  className={MCStyle.slide}>팝업C7</SwiperSlide>
            </Swiper>
        </>
    )
}

