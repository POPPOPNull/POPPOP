import { useEffect, useState } from "react"
import USStyle from "./UserSearch.module.css"
import { selectPopupstoreByOpenStatus } from "../../../api/PopupStoreAPI"
import TPStyle from "./UserSearch.module.css"
import Blank from "../usermain/Blank"
import PopupStores from "../../PopupStores";




function SearchBar(){

    const [isVisible,setIsVisible] = useState(false)
    const [searchWord, setSearchWord] = useState("")

    const onClickOpen = () =>{
        setIsVisible(true)
    }
    const onClickClose = () =>{
        setIsVisible(false)
    }

    const onChangeKeyword = (e)=>{
        setSearchWord(e.target.value)
    }

    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const date = new Date().getDate();
    const today = year+"-"+month+"-"+date;
    const startDate = today
    const endDate = today

    const [status, setStatus] = useState("open")
    const[popups, setPopups] = useState([])


    const onChangeStatus = (e) =>{
        setStatus(e.target.value)
    }

    const onCLickSearch = async ()=>{
        selectPopupstoreByOpenStatus(startDate,endDate,status,searchWord)
        .then(data=>{
            console.log("popups",data)
            setPopups(data)
        })
        
        setIsVisible(false)
    }

    useEffect(()=>{
        selectPopupstoreByOpenStatus(startDate,endDate,status,searchWord)
        .then(data=>{
            console.log("popups",data)
            setPopups(data)
        })
    },[status])

    

    


    return(
        <>
            <div className={USStyle.layout}>
                <div className={USStyle.searchbar} onClick={onClickOpen}>{searchWord}</div>
            </div>

            {isVisible&&
            <div>
                <div className={USStyle.searchbg}></div>
                <div className={USStyle.searchbox}>
                    <div className={USStyle.searchlayout}>
                        <input type="text" 
                        className={USStyle.searchbar}
                        onChange={onChangeKeyword}
                        value={searchWord}
                        />                    
                        <button className={USStyle.searchbutton} onClick={onCLickSearch}>검색</button>
                        <button className={USStyle.searchbutton} onClick={onClickClose}>닫기</button>
                    </div>
                </div>
            </div>}
            <Blank/>


            <select onChange={onChangeStatus} className={TPStyle.select}>
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

export default SearchBar