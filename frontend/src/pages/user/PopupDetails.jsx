import Header from "../../layouts/usermain/header";
import Buttons from "../../layouts/usermain/buttonbar";
import Popups from "../../layouts/userdetail/Popups";
import SimpleChat from "../../components/chatbot/SimpleChat.jsx"; 

function PopupDetails(){
    return(
        <>
        <Header/>
        <Popups/>
        <Buttons/>
        <SimpleChat /> 
        </>
    )
}

export default PopupDetails;