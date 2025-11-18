import { useEffect, useState } from "react"
import BCStyle from "./MidComp.module.css"
import { selectAllPopupStore, selectPopupByDate, selectPopupRandomly } from "../../../api/PopupStoreAPI"
import PopupStores from "../../PopupStores"
import { Link } from "react-router-dom"



export function BotComp() {

    const [isDrag,setIsDrag] = useState(false)
    const [popupStores, setPopupStores] = useState([])

    const [searchDay, setSearchDay] = useState(new Date())
    const [classIndex, setClassIndex] = useState(0)

    const todayYear = searchDay.getFullYear();
    const todayMonth = searchDay.getMonth()+1;
    const todayDate  = searchDay.getDate();
    const today = todayYear + "-" + todayMonth + "-" + todayDate

    const day7 = ['일','월','화','수','목','금','토']

    const onClickDate = (e)=>{
        
    }
    

    
    

    

    
    
    const date = [];
    for(let i=0;i<10;i++){
        const today = new Date()
        today.setDate(today.getDate()+i)        
        date.push(today)
    }
    

    useEffect(()=>{
        const fetchData = async () =>{

            const data = await selectPopupByDate(today)
            const length = data.length
            console.log(length)
            
            
            const popups = new Set();
            for(let i = popups.size; i<10;i=popups.size){
                const a = parseInt(Math.random()*length)
                // console.log(a)
                // console.log("size",popups.size)
                // console.log("i",i)
                popups.add(data[a])
            }
            // console.log("popups",popups)
            const popupArray = Array.from(popups)
            setPopupStores(popupArray)


    
        }
        fetchData()
        console.log(today)
        console.log(classIndex)
        
    },[searchDay])




    return(
        <>
            <div className={BCStyle.explain}>오늘 방문 가능한 팝업스토어</div>
            <div className={BCStyle.datelayout}>
                {date.map((date, index) =><div className={classIndex===index?BCStyle.active:BCStyle.date} index={index} onClick={()=>{setSearchDay(date);setClassIndex(index)}}>
                                    <div className={BCStyle.day}>
                                        {(date.getDate()==new Date().getDate()) ? "today" : day7.at(date.getDay())}
                                    </div>
                                    <div>{date.getDate()}</div>
                                </div>)}
            </div>
            <div className={BCStyle.botlayout}>
                {popupStores.map(popupstore =><PopupStores key={popupstore.no} popupstore={popupstore} setIsDrag={setIsDrag} posterNo={popupstore.no}/>)}
            </div>
            <Link to={"/user/search"}>
                <div className={BCStyle.more}>더보기</div>
            </Link>
        </>
    )
}