import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth.jsx';

function Logout() {
    
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
    
    alert("로그아웃되었습니다.");

    logout();

  };

    return (
        <>
            <button 
            onClick={handleLogout} 
            style={{
                marginTop:"100px",
                marginLeft:"780px",
                color:"gray",
                fontWeight:"800",
                cursor:"pointer",
                fontSize:"20px",
                lineHeight:"1.2",
                background:"none",
                border: "none"
            }}
            >
            logout</button>
        </>
    )
}

export default Logout;