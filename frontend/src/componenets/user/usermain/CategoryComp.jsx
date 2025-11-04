import { useDrag } from "react-dnd";
import CCStyle from "./MidComp.module.css"
import { Swiper, SwiperSlide } from "swiper/react";


function CategoryComp(){



    return(
        <>
            <div className={CCStyle.explain}>카테고리</div>
            <div className={CCStyle.categorylayout}>
                <div className={CCStyle.category}>카테고리1</div>
                <div className={CCStyle.category}>카테고리2</div>
                <div className={CCStyle.category}>카테고리3</div>
                <div className={CCStyle.category}>카테고리4</div>
                <div className={CCStyle.category}>카테고리5</div>
                <div className={CCStyle.category}>카테고리6</div>
                <div className={CCStyle.category}>카테고리7</div>
            </div>
            <Swiper
                className={CCStyle.layout}
                slidesPerView={3}
                spaceBetween={10}
                slidesOffsetAfter={200}
                
            >
                <SwiperSlide className={CCStyle.slide}>카테고리별 팝업</SwiperSlide>
                <SwiperSlide className={CCStyle.slide}>카테고리별 팝업</SwiperSlide>
                <SwiperSlide className={CCStyle.slide}>카테고리별 팝업</SwiperSlide>
                <SwiperSlide className={CCStyle.slide}>카테고리별 팝업</SwiperSlide>
                <SwiperSlide className={CCStyle.slide}>카테고리별 팝업</SwiperSlide>
                <SwiperSlide className={CCStyle.slide}>카테고리별 팝업</SwiperSlide>
                <SwiperSlide className={CCStyle.slide}>카테고리별 팝업</SwiperSlide>
            
            </Swiper>
        </>
    )
}

export default CategoryComp;