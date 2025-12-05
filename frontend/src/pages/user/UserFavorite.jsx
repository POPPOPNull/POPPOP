import Buttons from "../../layouts/usermain/buttonbar";
import Header from "../../layouts/usermain/header";
import FavoriteBody from "../../layouts/userfavorite/FavoriteBody";
import SimpleChat from "../../components/chatbot/SimpleChat.jsx"; 

function UserFavorite (){
    return(
        <>
            <Header/>
            <FavoriteBody/>
            <Buttons/>
            <SimpleChat /> 
        </>
    )
}

export default UserFavorite