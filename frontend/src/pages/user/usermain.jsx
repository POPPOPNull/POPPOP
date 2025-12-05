import Header from "../../layouts/usermain/header";
import Main from "../../layouts/usermain/main";
import Buttons from "../../layouts/usermain/buttonbar";
import SimpleChat from "../../components/chatbot/SimpleChat.jsx"; 

function UserMain(){
    return(
        <>
        <Header/>
        <Main/>
        <Buttons/>
        <SimpleChat /> 
        </>
    )
}

export default UserMain;