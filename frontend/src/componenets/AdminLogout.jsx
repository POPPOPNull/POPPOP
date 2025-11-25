import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth.jsx';

function AdminLogout() {
    
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {

        alert("로그아웃 되었습니다.");

        logout();

    };

    return (
        <>
            <button 
            onClick={handleLogout} 
            style={{
                color:"#929498",
                fontWeight:"800",
                cursor:"pointer",
                fontSize:"20px",
                lineHeight:"1.2",
                background:"none",
                border: 'none'
                
            }}
            >
            로그아웃</button>
        </>
    )
}

export default AdminLogout;