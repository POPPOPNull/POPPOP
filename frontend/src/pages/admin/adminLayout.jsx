import { Outlet } from 'react-router-dom';
import { SearchProvider } from '../../components/admin/SearchProvider';
import AdminSidebar from '../../layouts/adminmain/admin-sidebar';
import AdminSearchBar from '../../components/admin/AdminSearchBar';
import Logout from '../../components/Logout';
import "../../layouts/adminmain/List-layout.css";


function AdminLayout() {
    return (
        // SearchProvider가 AdminLayout 내부 컴포넌트들에만 Context 제공
        <SearchProvider>
            <div style={{ display: 'flex' }}>
                <AdminSidebar/>
                <main className='admin-main-layout'>
                    <AdminSearchBar/>
                    <hr style={{ margin: '20px 0'}}/>
                    <Outlet />
                </main>
            </div>
        </SearchProvider>
    )
}

export default AdminLayout;