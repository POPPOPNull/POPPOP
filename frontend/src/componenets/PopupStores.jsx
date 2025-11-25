import { Link } from "react-router-dom"
import PSStyle from "./PopupStore.module.css"
import { useEffect,useState } from "react"
import { insertFavorite } from "../api/FavoriteAPI"
import { useDrag, useDrop } from "react-dnd"
import { countFavorite, countViews } from "../api/BehaviorAPI"


function PopupStores({popupstore,setIsDrag,posterNo}){

        const imageUrl =  `/public/poster/poster_${posterNo}.png`
        const [view, setView] = useState()
        const [favorite, setFavorite] = useState()

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
                    console.log('드래그종료, 드롭 안됨',item.popupstore.no)
                }
            },
            
        })

        useEffect(()=>{
            setIsDrag(isDragging)
        },[isDragging,setIsDrag])

        useEffect(()=>{
            countViews(posterNo)
            .then(data=>{setView(data)})
            countFavorite(posterNo)
            .then(data=>{setFavorite(data)})
        },[])
    
    return(
        <>
            
                <Link to={`/user/${popupstore.no}`}>
                    <div ref={preview}></div>
                    <div className={PSStyle.layout} ref={drag}>
                        <div className={PSStyle.image}>
                            <img src={imageUrl} alt={popupstore.no} className={PSStyle.img}/>
                        </div>
                            <div className={PSStyle.explain}>
                                <div>{popupstore.name}</div>
                                <div className={PSStyle.small}>{popupstore.location}</div>
                                <div className={PSStyle.small}>{popupstore.startDate} ~ {popupstore.endDate}</div>
                            </div>
                    </div>
                </Link>
                        <div className={PSStyle.favorite}>
                            <div className={PSStyle.viewlayout}>
                                <div className={PSStyle.view}><img src="\public\icons\eye.png" style={{width:15,height:15}}/></div>{view}
                            </div>
                            <div className={PSStyle.favoritelayout}>
                                <div>♡</div>{favorite}
                            </div>
                        </div>
                    
            
        </>
    )
}

export default PopupStores