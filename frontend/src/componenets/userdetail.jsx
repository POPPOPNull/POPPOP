import { Link } from "react-router-dom"
import "./userdetail.css"


function UserDetail({user}){
    return(
        <>
        <div className="userdetails-layout">
        <div className="userdetails">
            <div>id :{user.id}</div>
            <div>이름 :{user.name}</div>
        </div>
        </div>
        </>
    )
}

export default UserDetail;