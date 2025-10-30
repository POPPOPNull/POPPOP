import Header from "../../layouts/usermain/header";
import Buttons from "../../layouts/usermain/buttonbar";
import Popups from "../../layouts/userdetail/Popups";
import SearchBar from "../../layouts/userdetail/SearchBar";

function PopupDetails(){
    return(
        <>
        <Header/>
        <Popups/>
        <Buttons/>
        </>
    )
}

export default PopupDetails;