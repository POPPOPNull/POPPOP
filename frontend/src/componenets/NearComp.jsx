import { Swiper, SwiperSlide } from "swiper/react";
import "./NearComp.css"

function NearComp (){
    return(
        <>
        <div className="explain">주변 팝업스토어</div>
            <Swiper
            className="layout"
            slidesPerView={3}
            spaceBetween={10}
            slidesOffsetAfter={100}
            >
                
                <SwiperSlide  className="slide">팝업N1</SwiperSlide>
                <SwiperSlide  className="slide">팝업N2</SwiperSlide>
                <SwiperSlide  className="slide">팝업N3</SwiperSlide>
                <SwiperSlide  className="slide">팝업N4</SwiperSlide>
                <SwiperSlide  className="slide">팝업N5</SwiperSlide>
                <SwiperSlide  className="slide">팝업N6</SwiperSlide>
                <SwiperSlide  className="slide">팝업N7</SwiperSlide>
            </Swiper>
        </>
    )
}

export default NearComp