import { useDrag, useDrop } from "react-dnd";
import CCStyle from "./MidComp.module.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { forwardRef, useEffect, useState } from "react";
import { selectAllCategory, selectPopupRandomly, selectPopupStoreByCategory } from "../../../api/PopupStoreAPI";
import PopupComp from "./PopupComp";
import { logDataBySelect } from "../../../api/BehaviorAPI";

function CategoryComp({popupstore}){


    const [categoryList, setCategoryList] = useState(["전체"])
    const [category, setCategory] = useState("게임");
    const [popup, setPopup] = useState([])
    


    const onClickCategory = e => {
        setCategory(e.target.textContent)  
        
    }



    useEffect(()=>{
        const fetchData = async () => {
            const data = await selectAllCategory()
            // console.log("catagory",category)
            setCategoryList(data)
            
            const data2 = await selectPopupStoreByCategory(category)
            // console.log(category,"팝업",data2)
            console.log('길이',data2.length)
            setPopup(data2)
            const array = new Array();
            for(let i = 0 ;i<data2.length;i++){
                array.push(data2[i].no)
            }
            console.log("현재 조회중",array)
            logDataBySelect(array)

            
        }
        fetchData()
        
    },[category])

    



    return(
        <>
            {/* <div className={CCStyle.a}>
                <div className={CCStyle.explain}>카테고리</div>
            <div className={CCStyle.categorylayout}>
                {categoryList.map((a,i)=><div key={a} className={category==a?CCStyle.categoryactive:CCStyle.category} onClick={onClickCategory} index={i}>{a}</div>)}
            </div>
                <Swiper
                className={CCStyle.layout}
                slidesPerView={3}
                spaceBetween={10}
                slidesOffsetBefore={30}
                slidesOffsetAfter={100}
                
            >
                {(popup).map(popupstore=><SwiperSlide className={CCStyle.slide}><PopupComp key={popupstore.no} popupstore={popupstore} posterNo={popupstore.no}/></SwiperSlide>)}
                
            
            </Swiper>
            </div> */}

            <div className={CCStyle.a}>
            {/* <div className={CCStyle.explain}>담당자 픽 인기 팝업 <span style={{color:"red"}}>월</span></div> */}
            <div className={CCStyle.explain}>카테고리별 인기 팝업</div>
            <div className={CCStyle.categorylayout}>
                {categoryList.map((a,i)=><div key={a} className={category==a?CCStyle.categoryactive:CCStyle.category} onClick={onClickCategory} index={i}>{a}</div>)}
            </div>
            <div>
                <Swiper
            slidesPerView={3}
            className={CCStyle.layout}
            spaceBetween={10}
            slidesOffsetBefore={30}
            slidesOffsetAfter={100}
            >
            {popup.map(popupstore =><SwiperSlide  className={CCStyle.slide}><PopupComp key={popupstore.no} popupstore={popupstore} posterNo={popupstore.no}/></SwiperSlide>)}
            </Swiper>
            </div>
        </div>
        </>
    )
}

export default CategoryComp;