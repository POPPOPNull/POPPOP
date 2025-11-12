import { useAuth } from '../hooks/UseAuth.jsx';

function Logout() {
    
    const { logout } = useAuth();

    return (
        <>
            <button 
            onClick={logout} 
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

export default Logout;