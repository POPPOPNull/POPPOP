import { useEffect,useState } from "react"
import { selectPopupstoreByOpenStatus } from "../../../api/PopupStoreAPI"
import PopupStores from "../../PopupStores";
import TPStyle from "./UserSearch.module.css"
import { selectFavoritePopupNo } from "../../../api/FavoriteAPI";





//export할 컴포넌트
function TodayPopup(){

    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const date = new Date().getDate();
    const today = year+"-"+month+"-"+date;
    const startDate = today
    const endDate = today

    const [status, setStatus] = useState("")
    const [searchWord, setSearchWord] = useState()
    const[popups, setPopups] = useState([])

    const [favoriteNo, setFavoriteNo] = useState([]);
    
    const[isFavorite,setIsFavorte]=useState(false)
    const[Narray,setNArray] = useState([])

    useEffect(()=>{
            selectFavoritePopupNo()
                .then(data=>{
                    
                    setFavoriteNo(data)
                    console.log("찜한것",data)
                    
                })
        },[])


    const onChangeStatus = (e) =>{
        setStatus(e.target.value)
    }

    useEffect(
        ()=>{
            selectPopupstoreByOpenStatus(startDate,endDate,status,searchWord)
            .then(data=>{
                console.log("검색기준데이터",data)
                setPopups(data)
            
            })
            
        }
        ,[status]
    )    
    return(
        <>
        <select name="" id="" onChange={onChangeStatus}>
            <option value="all" >전체</option>
            <option value="done" >종료</option>
            <option value="open" defaultValue={true}>진행중</option>
            <option value="scheduled">오픈 예정</option>
        </select>

        <div className={TPStyle.popuplayout}>
            {popups.map(popup=> <PopupStores key={popup.no} popupstore={popup} isFavorite={(favoriteNo.includes(popup.no)?isFavorite:!isFavorite)}/>)}
        </div>
        </>
    )
}

export default TodayPopup