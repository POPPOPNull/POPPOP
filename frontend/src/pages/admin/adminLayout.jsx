import { Outlet, useLocation } from 'react-router-dom';
import { SearchProvider } from '../../components/admin/searchProvider';
import AdminSidebar from '../../layouts/adminmain/admin-sidebar';
import AdminSearchBar from '../../components/admin/adminSearchBar';
import Logout from '../../components/Logout';
import "../../layouts/adminmain/list-layout.css";


function AdminLayout() {
    const location = useLocation();
    // 검색창을 숨길 경로 목록
    const hideSearchPaths = ['/admin', '/admin/manager-main'];
    const showSearchBar = !hideSearchPaths.includes(location.pathname);

    return (
        // SearchProvider가 AdminLayout 내부 컴포넌트들에만 Context 제공
        <SearchProvider>
            <div style={{ display: 'flex' }}>
                <AdminSidebar />
                <main className='admin-main-layout'>
                    {showSearchBar && <AdminSearchBar />}
                    {/* {showSearchBar && <hr style={{ margin: '20px 0' }} />} */}
                    <Outlet />
                </main>
            </div>
        </SearchProvider>
    )
}

export default AdminLayout;