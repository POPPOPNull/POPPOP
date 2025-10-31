import { useEffect,useState } from "react"
import { selectPopupstoreByOpenStatus } from "../../api/PopupStoreAPI"
import PopupStores from "../PopupStores";
import TPStyle from "./UserSearch.module.css"

function TodayPopup(){

    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const date = new Date().getDate();
    const today = year+"-"+month+"-"+date;
    const startDate = today
    const endDate = today

    const [status, setStatus] = useState("")
    const[popups, setPopups] = useState([])


    useEffect(
        ()=>{
            selectPopupstoreByOpenStatus(startDate,endDate,status)
            .then(data=>{
                console.log("data",data)
                setPopups(data)
            })
            console.log(status)
            console.log(startDate,endDate)
        }
        ,[status]
    )

    const onChangeStatus = (e) =>{
        setStatus(e.target.value)
        
    }

    
    return(

        
        <>
        
        <select name="" id="" onChange={onChangeStatus}>
            <option value="all" >전체</option>
            <option value="done" >종료</option>
            <option value="open" defaultValue={true}>진행중</option>
            <option value="scheduled">오픈 예정</option>
        </select>


        <div className={TPStyle.popuplayout}>
            {popups.map(popup=> <PopupStores key={popup.no} popupstore={popup}/>)}
        </div>
        </>
    )
}

export default TodayPopup