import UpdateUser from "./userupdate"
import RegistUser from "./userinsert"
import RemoveUser from "./userremove"







function UserCRUD (){
    return(
        <>
            <RegistUser/>
            <RemoveUser/>
            <UpdateUser/>
        </>
    )
}

export default UserCRUD