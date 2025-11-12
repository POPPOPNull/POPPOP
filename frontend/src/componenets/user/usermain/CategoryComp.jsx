import { useDrag, useDrop } from "react-dnd";
import CCStyle from "./MidComp.module.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { forwardRef, useEffect, useState } from "react";
import { selectAllCategory, selectPopupStoreByCategory } from "../../../api/PopupStoreAPI";
import PopupComp from "./PopupComp";
forwardRef




function CategoryComp({popupstore}){

    const [{isDragging},drag,preview] = useDrag({
            type:'popup',
            item : {popupstore},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                
            })
            ,
            end : (item,monitor) =>{
                if(monitor.didDrop()){
                    console.log("드롭완료")
                }else{
                    console.log('드래그종료, 드롭 안됨',item)
                }
            }
        })

    const [categoryList, setCategoryList] = useState(["전체"])
    const [category, setCategory] = useState("전체");
    const [popup, setPopup] = useState([])

    const onClickCategory = e => {
        setCategory(e.target.textContent)       
    }

    useEffect(()=>{
        selectAllCategory()
        .then(data=>{
            console.log("카테고리 = ",data)
            setCategoryList(data)
            console.log("선택된 카테고리 : ",category)
            
            
        })
    },[category])

    useEffect(()=>{
        selectPopupStoreByCategory(category)
        .then(data=>{
            console.log("카테고리별 팝업스토어 : ",data)
            setPopup(data)
        })
    },[category])



    return(
        <>
            <div className={CCStyle.explain}>카테고리</div>
            <div className={CCStyle.categorylayout}>
                {categoryList.map(a=><div key={a} className={CCStyle.category} onClick={onClickCategory}>{a}</div>)}
                
                
            </div>
                <Swiper
                className={CCStyle.layout}
                slidesPerView={3}
                spaceBetween={10}
                slidesOffsetBefore={30}
                slidesOffsetAfter={200}
                
            >
                {popup.map(popupstore=><SwiperSlide className={CCStyle.slide}><PopupComp key={popupstore.no} popupstore={popupstore} posterNo={popupstore.no}/></SwiperSlide>)}
                
            
            </Swiper>
        </>
    )
}

export default CategoryComp;