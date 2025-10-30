import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sampleIcon1 from '../../assets/icons/users-alt.svg';

function AdminKPI1(){

    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let mounted = true;
        axios.get("http://localhost:8080/admin/users-count")
            .then(res => {
                if (!mounted) return;
                setCount(res.data?.usersCount ?? 0);
            })
            .catch(e => {
                if (!mounted) return;
                setErr(e.message || "fetch error");
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });
        return () => { mounted = false; };
    }, []);

    return(
        <>
        <div className="adminKPI-box1">
            <img src={sampleIcon1} alt="샘플1" className="side-icon"/>
            {loading ? "로딩..." : err ? `에러: ${err}` : `사용자 수 / ${count}`}
        </div>
        </>
    );
}

export default AdminKPI1;