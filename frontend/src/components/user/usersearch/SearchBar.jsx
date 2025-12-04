import { useEffect, useState } from "react"
import USStyle from "./UserSearch.module.css"
import { selectPopupstoreByOpenStatus } from "../../../api/PopupStoreAPI"
import TPStyle from "./UserSearch.module.css"
import Blank from "../usermain/Blank"
import PopupStores from "../../PopupStores";
import { logSearchWord } from "../../../api/BehaviorAPI"
import { selectFavoritePopupNo } from "../../../api/FavoriteAPI"


function NoSearchResult({props}){
    return(
        <>
            <div></div>
            <div className={TPStyle.nosearchresult}>
                
                <div>
                    <div><img src="/icons/issue-loupe.png" style={{width:200,height:200}}/></div>
                    검색어 "{props}" 에 해당하는 팝업스토어가 존재하지 않습니다.
                </div>
            </div>
        </>
    )
}


function SearchBar(){

    const [isDrag,setIsDrag] = useState(false)
    const [isVisible,setIsVisible] = useState(false)
    const [searchWord, setSearchWord] = useState("")

     const [favoriteNo, setFavoriteNo] = useState([]);
    
    const[isFavorite,setIsFavorte]=useState(false)
    const[Narray,setNArray] = useState([])
    const [style,setStyle] = useState({
            display:"none"
        })

    const onClickOpen = () =>{
        setStyle({
            display:"flex"
        })
    }
    const onClickClose = () =>{
        setStyle({
            display:"none"
        })
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
        console.log(status)
    }

    const onCLickSearch = async ()=>{
        logSearchWord(searchWord)
        selectPopupstoreByOpenStatus(startDate,endDate,status,searchWord)
        .then(data=>{
            console.log("popups",data)
            setPopups(data)
        })
        
        setStyle({
            display:"none"
        })
        
    
    }

    const onEnterKeyDown = async (e)=>{
        if(e.keyCode==13){
            logSearchWord(searchWord)
            selectPopupstoreByOpenStatus(startDate,endDate,status,searchWord)
        .then(data=>{
            console.log("popups",data)
            setPopups(data)
        })
        
        setStyle({
            display:"none"
        })
        }

        
    }

    useEffect(()=>{
        selectPopupstoreByOpenStatus(startDate,endDate,status,searchWord)
        .then(data=>{
            console.log("popups",data)
            setPopups(data)
        })
    },[searchWord,status])

    useEffect(()=>{
            selectFavoritePopupNo()
                .then(data=>{
                    
                    setFavoriteNo(data)
                    console.log("찜한것",data)
                    
                })
        },[])

    
        
    


    return(
        <>
            <div className={USStyle.layout}>
                <div className={USStyle.searchbar} onClick={onClickOpen}>{searchWord}</div>
            </div>

            
            <div style={style}>
                <div className={USStyle.searchbg}></div>
                <div className={USStyle.searchbox}>
                    <div className={USStyle.searchlayout}>
                        <input type="text" 
                        className={USStyle.searchbar}
                        onChange={onChangeKeyword}
                        onKeyDown={onEnterKeyDown}
                        autoFocus={true}
                        value={searchWord}
                        />                    
                        <button className={USStyle.searchbutton} onClick={onCLickSearch}>{(searchWord=="")?"닫기":"검색"}</button>
                        {/* <button className={USStyle.searchbutton} onClick={onClickClose}>닫기</button> */}
                    </div>
                </div>
            </div>
            <Blank/>


            <select onChange={onChangeStatus} className={TPStyle.select}>
            <option value="all" >전체</option>
            <option value="done" >종료</option>
            <option value="open" defaultValue={true} selected={true}>진행중</option>
            <option value="scheduled">오픈 예정</option>
            </select>

        <div className={TPStyle.popuplayout}>
            {popups.length==0? <NoSearchResult props={searchWord} /> : popups.map(popup=> <PopupStores key={popup.no} isFavorite={(favoriteNo.includes(popups.no)?isFavorite:!isFavorite)} popupstore={popup} setIsDrag={setIsDrag} posterNo={popup.no} />)}
        </div>
        </>
    )
}

export default SearchBar