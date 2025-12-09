import { Link } from "react-router-dom"
import PSStyle from "./PopupStore.module.css"
import { useEffect,useState } from "react"
import { insertFavorite, selectFavoritePopupNo } from "../api/FavoriteAPI"
import { useDrag, useDrop } from "react-dnd"
import { countFavorite, countViews } from "../api/BehaviorAPI"


function PopupStores({popupstore,setIsDrag,posterNo,isFavorite}){

        const imageUrl =  `/poster/poster_${posterNo}.png`
        const [view, setView] = useState()
        const [favorite, setFavorite] = useState()
        const [isDrop, setIsDrop] = useState(false)

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
                    setIsDrop(!isDrop)
                    console.log("isDrop",isDrop)
                }else{
                    console.log('드래그종료, 드롭 안됨',item.popupstore.no)
                }
            },
            
        })

        

        useEffect(()=>{
            setIsDrag(isDragging)
        },[isDragging])

        useEffect(()=>{
            const fetchData = async () =>{
                const data =  await countViews(posterNo)
                setView(data)

                const data2 = await countFavorite(posterNo)
                setFavorite(data2)
                
            }
            fetchData()
        },[isDrop])
        

        
    
    return(
        <>
            
                <Link to={`/popup-stores/${popupstore.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div ref={preview}></div>
                    <div className={PSStyle.layout} ref={drag}>

                            {/* 이미지 */}
                            <div className={PSStyle.image}>
                                <img src={imageUrl} alt={popupstore.no} className={PSStyle.img}/>
                            </div>

                            {/* 설명 */}
                            <div className={PSStyle.explain}>
                                <div>{popupstore.name}</div>
                                <div className={PSStyle.small}>{popupstore.location}</div>
                                <div className={PSStyle.small}>{popupstore.startDate} ~ {popupstore.endDate}</div>
                            </div>

                            {/* 찜 및 조회 수 */}
                            <div className={PSStyle.favorite}>
                                <div className={PSStyle.viewlayout}>
                                    <div className={PSStyle.view}><img src="/icons/eye.png" style={{width:15,height:12}}/></div>{view}
                                </div>
                                <div className={PSStyle.favoritelayout}>
                                    <div className={isFavorite?PSStyle.n:PSStyle.f}>{isFavorite?"♡":"♥"}</div>{favorite}
                                </div>
                            </div>
                    </div>
                    
                </Link>
                        
                    
            
        </>
    )
}

export default PopupStores