import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth.jsx';

function AdminLogout() {
    
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate('/admin/login');
    };

    return (
        <>
            <button 
            onClick={handleLogout} 
            style={{
                marginTop:"100px",
                color:" var(--yellow)",
                fontWeight:"800",
                cursor:"pointer",
                fontSize:"30px",
                lineHeight:"1.2",
                background:"none"
                
            }}
            >
            logout</button>
        </>
    )
}

export default AdminLogout;