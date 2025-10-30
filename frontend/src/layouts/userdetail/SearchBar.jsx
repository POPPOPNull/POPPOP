import SBStyle from "./SearchBar.module.css"

function SearchBar(){

    return(
        <>
            <div className={SBStyle.searchbar}>
                <div className={SBStyle.search}>검색</div>
            </div>
        </>
    )
}
export default SearchBar;