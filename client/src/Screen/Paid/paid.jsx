import AdminHeader from '../../Components/admin_header/admin_header'
import PaidUsers from '../../Components/paid_users/paid_users'


function PaidUserPage() {
    return (
       <div className='root_page'>
            <AdminHeader />
            <PaidUsers />
       </div>
    )
}

export default PaidUserPage
