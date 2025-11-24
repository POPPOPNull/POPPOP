import { useDrag, useDrop } from "react-dnd";
import CCStyle from "./MidComp.module.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { forwardRef, useEffect, useState } from "react";
import { selectAllCategory, selectPopupRandomly, selectPopupStoreByCategory } from "../../../api/PopupStoreAPI";
import PopupComp from "./PopupComp";
import { logDataBySelect } from "../../../api/BehaviorAPI";

function CategoryComp({popupstore}){

    // const [{isDragging},drag,preview] = useDrag({
    //         type:'popup',
    //         item : {popupstore},
    //         collect: (monitor) => ({
    //             isDragging: monitor.isDragging(),
                
    //         })
    //         ,
    //         end : (item,monitor) =>{
    //             if(monitor.didDrop()){
    //                 console.log("드롭완료")
    //             }else{
    //                 console.log('드래그종료, 드롭 안됨',item)
    //             }
    //         }
    //     })

    const [categoryList, setCategoryList] = useState(["전체"])
    const [category, setCategory] = useState("게임");
    const [popup, setPopup] = useState([])
    


    const onClickCategory = e => {
        setCategory(e.target.textContent)  
        
    }

    // useEffect(()=>{
    //     selectAllCategory()
    //     .then(data=>{
    //         // console.log("카테고리 = ",data)
    //         setCategoryList(data)
    //         console.log("선택된 카테고리 : ",category)
            
            
    //     })
    // },[category])

    // useEffect(()=>{
    //     selectPopupStoreByCategory(category)
    //     .then(data=>{
    //         console.log("카테고리별 팝업스토어 : ",data)
    //         setPopup(data)
    //     })
    //     const array = new Array();
    //     for ( let i = 0 ; i<popup.length;i++){
    //         array.push(popup[i].no)
    //     }
    //     logDataBySelect(array)
        
    // },[])

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
            <div className={CCStyle.explain}>카테고리</div>
            <div className={CCStyle.categorylayout}>
                {categoryList.map((a,i)=><div key={a} className={category==a?CCStyle.categoryactive:CCStyle.category} onClick={onClickCategory} index={i}>{a}</div>)}
            </div>
                <Swiper
                className={CCStyle.layout}
                slidesPerView={3}
                spaceBetween={10}
                slidesOffsetBefore={30}
                slidesOffsetAfter={200}
                
            >
                {(popup).map(popupstore=><SwiperSlide className={CCStyle.slide}><PopupComp key={popupstore.no} popupstore={popupstore} posterNo={popupstore.no}/></SwiperSlide>)}
                
            
            </Swiper>
        </>
    )
}

export default CategoryComp;