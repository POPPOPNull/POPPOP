import { Swiper, SwiperSlide } from "swiper/react";
import TCSytle from "./TopComp.module.css"
// import "swiper/modules";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css"
import { Autoplay } from "swiper/modules";





function TopComp (){

    return(
        <>
            <div className={TCSytle.layout}>최상단컴포넌트
                <Swiper
                    className={TCSytle.swiper}
                    spaceBetween={10}
                    slidesPerView={5}
                    loop={true}
                    modules={[Autoplay]} 
                    autoplay={{
                        delay:2000
                    }}
                    
                >
                    <SwiperSlide className={TCSytle.slide}>팝업A1</SwiperSlide>
                    <SwiperSlide className={TCSytle.slide}>팝업A2</SwiperSlide>
                    <SwiperSlide className={TCSytle.slide}>팝업A3</SwiperSlide>
                    <SwiperSlide className={TCSytle.slide}>팝업A4</SwiperSlide>
                    <SwiperSlide className={TCSytle.slide}>팝업A5</SwiperSlide>
                    <SwiperSlide className={TCSytle.slide}>팝업A6</SwiperSlide>
                    <SwiperSlide className={TCSytle.slide}>팝업A7</SwiperSlide>
                    
                </Swiper>
            </div>
        </>
    )
}

export default TopComp;