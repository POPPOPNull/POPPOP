import { Swiper, SwiperSlide } from "swiper/react";
import TCSytle from "./TopComp.module.css"
// import "swiper/modules";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css"
import { Autoplay, EffectCreative } from "swiper/modules";





function TopComp (){

    return(
        <>
            <div className={TCSytle.layout}>
                <Swiper
                    className={TCSytle.swiper}
                    spaceBetween={-100}
                    slidesPerView={3}
                    loop={true}
                    modules={[Autoplay,EffectCreative,]} 
                    autoplay={{
                        delay:2000
                    }}
                    effect={'creative'}
                    creativeEffect={{
                        "prev": {
                            "shadow": true,
                            "translate": [
                            "-50%",
                            0,
                            -1
                            ]
                            ,scale:0.9
                            
                            
                        },
                        "next": {
                            "shadow": true,
                            "translate": [
                            "50%",
                            0,
                            -1
                            ],
                            scale:0.9
                        }
                        }}
                    centeredSlides={true}
                >
                    <div>
                        {[1,2,3,4,5,6,7].map(a=> <SwiperSlide className={TCSytle.slide}>임시</SwiperSlide>)}
                    </div>
                </Swiper>
            </div>
        </>
    )
}

export default TopComp;