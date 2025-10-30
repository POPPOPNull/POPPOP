import SearchIcon from '../../assets/icons/search.svg';

function AdminSearchBar(){
    return(
        <>
        <div className="adminSearchBar">
            <img src={SearchIcon} alt="검색" className="side-icon"/><input type="text" placeholder="검색어를 입력하세요" className="adminSearchBar-box"/>
        </div>
        </>
    )
}

export default AdminSearchBar;