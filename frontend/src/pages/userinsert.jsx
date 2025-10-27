import { useState, useEffect } from "react";
import { getAllUsers, registUser } from "../api/userapi";
import "./userinsert.css"
import { useNavigate } from "react-router-dom";


function RegistUser(){

    const naviagate = useNavigate()
    
    const[user,setUser]=useState({
        id:0,
        name:""
    })
    
    const onChangeHandler = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    useEffect((e)=>{
        setUser(user)
        console.log(user)
    },[user])



    const onClickHandler = () =>{
        console.log(user)
        registUser(user)
    }

    return(
        <>
            <div className="userinsert">
                <h1>유저 등록</h1>
                <div>id:</div>
                <input type="number" name="id" onChange={onChangeHandler}/>
                <div>이름:</div>
                <input type="text" name="name" onChange={onChangeHandler}/>
                <button onClick={onClickHandler}>등록</button>
            </div>
        </>
    )
}

export default RegistUser;