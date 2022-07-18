import newsIcon from '../../images/newspaper-solid.png'
import pageIcon from '../../images/file-lines-solid.png'
import announcementIcon  from '../../images/scroll-solid.png'
import uploadIcon from '../../images/photo-film-solid.png'
import photoIcon from '../../images/image-solid.png'
import videoIcon from '../../images/film-solid.png'
import fileIcon from '../../images/file-solid.png'
import chartIcon from '../../images/chart-line-solid.png'
import './admin_header.css'
import {Link} from 'react-router-dom'

function AdminHeader() {
    return (
        <>
            <div id="wrapper">
                <div class="topbar">
                    <div class="topbar-left">
                        <Link to="/" class="logo">
                            <span class="logo-light">
                                <h1>TKTI</h1>
                            </span>
                            <span class="logo-sm">
                                <i class="fa-solid fa-newspaper"></i>
                            </span>
                        </Link>
                    </div>
                </div>
                <div class="left side-menu">
                    <div class="slimscroll-menu" id="remove-scroll">
                        <div id="sidebar-menu">
                            <ul class="metismenu" id="side-menu">
                            <li class="menu-title">Menu</li>
                                <li>
                                    <a href="/qabul" class="waves-effect">
                                        <i
                                        class="mdi  mdi-message-text-outline text-white bg-warning"><img src={newsIcon} alt="" width={18} /></i>
                                        <span> Barcha Talabalar </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/paid" class="waves-effect">
                                        <i
                                        class="mdi  mdi-message-text-outline text-white bg-warning"><img src={pageIcon} alt="" width={15} /></i>
                                        <span> To'lov qilgan talabalar </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/statistics" class="waves-effect">
                                        <i
                                        class="mdi mdi-trending-up bg-success text-white"><img src={chartIcon} alt="" width={18} /></i>
                                        <span> Statistika </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminHeader;
