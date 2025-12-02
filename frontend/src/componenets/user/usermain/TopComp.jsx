import { Swiper, SwiperSlide } from "swiper/react";
import TCSytle from "./TopComp.module.css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css"
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { selectAllPopupStore, selectPopupRandomly } from "../../../api/PopupStoreAPI";
import PopupComp from "./PopupComp";
import { Link } from "react-router-dom"
import { logDataBySelect } from "../../../api/BehaviorAPI";
import "./swiper.css";








function TopComp (){

    const [popups,setPopups] = useState([])

    useEffect(()=>{
        const fetchData = async() =>{
            const data = await selectAllPopupStore()
            const length = data.length
        

            const data2 = await selectPopupRandomly(7,length)
            setPopups(data2)
            const array = new Array()
            for (let i = 0 ; i < data2.length;i++){
                array.push(data2[i].no)
            }
            console.log("상단",array)
            logDataBySelect(array)
        }
        fetchData();
    },[])


    
    

    return(
        <>
            <div className={TCSytle.layout}>
                <Swiper
                    className={TCSytle.swiper}
                    spaceBetween={-200}
                    slidesPerView={3}
                    loop={true}
                    modules={[Autoplay,EffectCreative,Pagination]} 
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
                    pagination={true}
                >
                    <Link to={`user/${popups.no}`}>
                        {popups.map(popups=> <SwiperSlide className={TCSytle.slide}><PopupComp key={popups.no} popupstore={popups} posterNo={popups.no}></PopupComp></SwiperSlide>)}
                    </Link>
                </Swiper>
            </div>
                {/* <div className={TCSytle.gradation}></div> */}
        </>
    )
}

export default TopComp;