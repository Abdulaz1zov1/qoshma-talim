import AdminHeader from '../../Components/admin_header/admin_header'
import NotPaidUsers from '../../Components/notpaid_users/notpaid_users'


function NotPaidUserPage() {
    return (
       <div className='root_page'>
            <AdminHeader />
            <NotPaidUsers />
       </div>
    )
}

export default NotPaidUserPage
