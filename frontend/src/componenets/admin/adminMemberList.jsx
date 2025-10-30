import { useState, useEffect } from "react";
import axios from "axios";

function AdminMemberList(){    

    const [searchText, setSearchText] = useState("");
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/admin/members");

                setMembers(response.data);
            } catch (error) {
                setErr(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    if (loading) {
        return <div>회원 목록을 불러오는 중...</div>
    }

    if (err) {
        return <div>오류 : {err.message || "알 수 없는 오류"}</div>
    }

    return(
        <div>
            {members.length > 0 ? (
        
                    members.map((member) => (
                        
                        <div key={member.id} className="mp-tr">
                            <div className="ellipsis">{member.id}</div>
                            <div className="ellipsis">{member.name}</div>
                            <div className="ellipsis">{member.phone}</div>
                            <div className="ellipsis">{member.email}</div>
                            <div className="ellipsis">{member.gender}</div>
                            <div className="ellipsis">{member.birthDate}</div>
                            
                        </div>
                    ))
                
            ) : (
                <div>등록된 회원이 없습니다.</div>

            )}
        </div>
    )
}

export default AdminMemberList;