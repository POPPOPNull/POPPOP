import { useState,useEffect} from "react";
import { updateUser } from "../api/userapi";
import "./userupdate.css"
import { useNavigate } from "react-router-dom";



function UpdateUser(){
    const naviagate = useNavigate()

    const[userDTO,setUserDTO] = useState({
        name: ""
    })

    const onChangeHandler3 = (e) => {
        setUserDTO(
            {...userDTO,
            [e.target.name]: e.target.value
        }
        )
        console.log(userDTO)
    }


    const [id,setId] = useState(0)
    const [name, setName] = useState("")

    const onChangeHandler = (e) =>{
        setName(e.target.value)
        console.log(name)
    }

    const onChangeHandler2 = (e) => {
        setId(e.target.value)
        console.log(id)
    }

    const onClickHandler = () => {
        updateUser(id,userDTO)
        console.log(id,name)
        naviagate("/test2")
    }



    

    return(
        <>
        <div className="userupdate-layout">
            <h1>유저 수정</h1>
            <div>수정할 유저 id : </div>
            <input type="number" onChange={onChangeHandler2}/>
            <div>수정 후 유저 이름 : </div>
            <input type="text" name="name" onChange={onChangeHandler3}/>
            <button onClick={onClickHandler}>수정</button>
        </div>
        </>
    )
}

export default UpdateUser;