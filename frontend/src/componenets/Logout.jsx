import { useAuth } from '../hooks/UseAuth.jsx';

function Logout() {
    
    const { logout } = useAuth();

    return (
        <>
            <button onClick={logout} style={{marginTop:"100px"}}>로그아웃</button>
        </>
    )
}

export default Logout;