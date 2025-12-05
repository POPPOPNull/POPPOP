import Buttons from "../../layouts/usermain/buttonbar";
import Header from "../../layouts/usermain/header";
import UserSearchBody from "../../layouts/usersearch/UserSearchBody";
import SimpleChat from "../../components/chatbot/SimpleChat.jsx"; 

function UserSearch(){
    return(
        <>
            <Header/>
            <UserSearchBody/>
            <Buttons/>
            <SimpleChat />
        </>
    )
}

export default UserSearch