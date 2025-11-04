import { useEffect, useState } from "react"
import SearchInput from "./SearchInput"
import USStyle from "./UserSearch.module.css"
import { Link } from "react-router-dom"


function SearchBar(){

    const [isVisible,setIsVisible] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [popup,setPopup] = useState([])

    const onClickOpen = () =>{
        setIsVisible(true)
    }
    const onClickClose = () =>{
        setIsVisible(false)
    }

    const onChangeKeyword = (e)=>{
        setKeyword(e.target.value)
    }

    const onCLickSearch = async ()=>{
        const response = await fetch(`http://localhost:8080/popup-stores/search?searchWord=${keyword}`)
        const result = response.json()
        result.then(data=>{
            setPopup(data)
            console.log("검색어 팝업",popup)
            
        })
        
        setIsVisible(false)
        

    }

    


    return(
        <>
            <div className={USStyle.layout}>
                <div className={USStyle.searchbar} onClick={onClickOpen}>검색어를 입력해주세요</div>
            </div>

            {isVisible&&
            <div>
                <div className={USStyle.searchbg}></div>
                <div className={USStyle.searchbox}>
                    <div className={USStyle.searchlayout}>
                        <input type="text" 
                        className={USStyle.searchbar}
                        onChange={onChangeKeyword}
                        />                    
                        <Link to={`/user/search/${keyword}`}>
                            <button className={USStyle.searchbutton} onClick={onCLickSearch}>검색</button>
                        </Link>
                        <button className={USStyle.searchbutton} onClick={onClickClose}>닫기</button>
                    </div>
                </div>
            </div>}


        </>
    )
}

export default SearchBar