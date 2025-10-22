import { useEffect, useState } from "react";
import { getAllUsers} from "../api/userapi";
import UserDetail from "../componenets/userdetail";

import "./userlist.css"




function Test2 () {
        const [users, setUsers] = useState([]);

    
        useEffect(()=>{
            getAllUsers().then(data => {
                console.log('메뉴 목록 : ',data)
                setUsers(data) 
            })
        },[])




    return(
        <>
            <h1>유저</h1>
            <div className="functions">

            </div>
            <div>
                <h1>유저 목록</h1>
                <div>{users.map(user=><UserDetail key={user.id} user={user}/>)}</div>
            </div>
        </>
    )
}
export default Test2;