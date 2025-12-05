import Header from "../../layouts/usermain/header";
import MapBody from "../../layouts/map/MapBody";
import Buttons from "../../layouts/usermain/buttonbar";
import SimpleChat from "../../components/chatbot/SimpleChat.jsx"; 

function Maps() {
    return(
        <>
        <Header/>
        <MapBody/>
        <Buttons/>
        <SimpleChat /> 
        </>
    )
}

export default Maps;