import { useState } from "react";

function AdminSearchBar(){    

    const [searchText, setSearchText] = useState("");

    return(
        <>
        <div className="adminSearchBar">
            <img src='/public/icons/search.png' alt="검색" className="side-icon"/>
            <input 
            type="text"
            placeholder="검색어를 입력하세요"
            className="adminSearchBar-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            />
        </div>
        </>
    )
}

export default AdminSearchBar;