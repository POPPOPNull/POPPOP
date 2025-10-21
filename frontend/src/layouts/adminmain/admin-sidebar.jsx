import "./admin-sidebar.css"

function AdminSidebar(){




    return(
        <>
        <div className="admin-sidebar-layout">
            <div className="admin-side-logo1">POPPOP</div>
            <div className="admin-sidebutton-layout">
                <div className="admin-side-button">메인</div>
                <div className="admin-side-button">사이드바 버튼 1</div>
                <div className="admin-side-button">사이드바 버튼 2</div>
                <div className="admin-side-button">사이드바 버튼 3</div>
                
                
            </div>

            <div className="admin-side-logo2">POPTNER</div>
            <div className="admin-sidebutton-layout">
                <div className="admin-side-button">POPTNER메인</div>
                <div className="admin-side-button">사이드바 버튼 1</div>
                <div className="admin-side-button">사이드바 버튼 2</div>
                <div className="admin-side-button">사이드바 버튼 3</div>
            </div>
            
        </div>
        </>
    )
}

export default AdminSidebar