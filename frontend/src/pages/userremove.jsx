import { useEffect, useState } from "react"
import { removeUser } from "../api/userapi"
import "./userremove.css"
import { useNavigate } from "react-router-dom"


function RemoveUser(){

    const navigate = useNavigate()

    const [id,setId] = useState(0)

    const onChangeHandler = e => {
        setId(e.target.value)
    }

    const onClickHandler = () => {
        removeUser(id)
        navigate("/test2")
    }
    useEffect(()=>{
        console.log(id)
    },[id])
    


    return(
        <>
            <div className="userremove-layout">
                <h1>유저 삭제</h1>
                <div>삭제할 아이디 : </div>
                <input type="number" name="id" onChange={onChangeHandler}/>
                <button onClick={onClickHandler}>삭제</button>
            </div>
        </>
    )
}

export default RemoveUser