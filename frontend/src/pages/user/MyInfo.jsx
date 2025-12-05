import Header from "../../layouts/usermain/header";
import MypageBody from "../../layouts/mypage/MyPageMain";
import Buttons from "../../layouts/usermain/buttonbar";
import SimpleChat from "../../components/chatbot/SimpleChat.jsx"; 

function Information() {
    return(
        <>
        <Header/>
        <MypageBody/>
        <Buttons/>
        <SimpleChat />
        </>
    )
}

export default Information;