import { useState, useEffect } from "react";
import axios from "axios";
import { selectAllMembers } from "../../api/adminAPI";

function AdminMemberList(){    

    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await selectAllMembers();
                setMembers(data);
            } catch (error) {
                console.error("selectAllMembers 호출 에러", error);
            } finally {
                
            }
        }
        fetchData();
    }, []);

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
                            <div className="ellipsis center">
                                {new Date(member.birthDate).toISOString().slice(0, 10)}
                            </div>
                            
                        </div>
                    ))
                
            ) : (
                <div>등록된 회원이 없습니다.</div>

            )}
        </div>
    )
}

export default AdminMemberList;