import SIStyle from './UserSearch.module.css'

function SearchInput (){
    return(
        <>
            <div className={SIStyle.display}>
                <div className={SIStyle.back}></div>
            
                <div className={SIStyle.searchinputbg}>
                    <div className={SIStyle.searchinputlayout}>
                    <input type="text" 
                    className={SIStyle.searchbar}
                    placeholder='검색어를 입력해주세요'
                    />
                    <button className={SIStyle.searchbutton}>검색</button>
                </div>
                </div>
            </div>
        </>
    )
}

export default SearchInput;