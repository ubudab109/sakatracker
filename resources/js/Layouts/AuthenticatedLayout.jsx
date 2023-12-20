import {
    useState,
    useEffect
} from "react";
import SideNavLayout from "./SideNavLayout";
import NavLink from "@/Components/NavLink";
import {
    Home,
    Users,
    Bell,
    FileText,
    Lock,
    UserPlus,
    UserCheck,
    Percent,
    Calendar,
    Shuffle,
    BarChart,
    File,
    CreditCard,
    BarChart2,
    Database,
    List
} from "react-feather";
import Dropdown from "@/Components/Dropdown";
import SidebarDropdown from "@/Components/SidebarDropdown";
import {
    initializeApp
} from "firebase/app";
import {
    getMessaging,
    getToken
} from 'firebase/messaging';
import Axios from "axios";
import moment from "moment";

export default function Authenticated({
    user,
    header,
    children
}) {
    const [body, setBody] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [unreadNotifications, setUnread] = useState(0);
    const [expanded, setExpanded] = useState(false);

    // Function to toggle the expanded state
    const toggleMenu = () => {
        setExpanded(!expanded);
    };

    const bodyClicked = () => {
        if (document.body.classList.contains("sidebar-enable")) {
            document.body.classList.remove("sidebar-enable");
            document.body.setAttribute("data-sidebar-size", "sm");
        } else {
            document.body.classList.add("sidebar-enable");
            document.body.setAttribute("data-sidebar-size", "lg");
        }
    };

    const [permissions, setPermissions] = useState("");
    const getPermissions = () => {
        Axios.get("/get-permissions").then((response) => {
            setPermissions(response.data);
        });
    }

    const [toggleSidebarDropdown, setToggleSidebarDropdown] =
        useState("hidden");

    const toggleSidebarDropdownClicked = () => {
        if (toggleSidebarDropdown == "hidden") {
            setToggleSidebarDropdown("");
        } else {
            setToggleSidebarDropdown("hidden");
        }
    };

    const requestNotificationPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                // Permission granted, you can now subscribe the user for push notifications.
            } else {
                console.log('Notification permission denied.');
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    };

    const setupFirebase = () => {
        // Initialize Firebase with your config
        const firebaseConfig = {
            apiKey: "AIzaSyB2LIBipp5lJQQVyI5DyUhMJeDpdl9E3KI",
            authDomain: "saka-track.firebaseapp.com",
            projectId: "saka-track",
            storageBucket: "saka-track.appspot.com",
            messagingSenderId: "713747155245",
            appId: "1:713747155245:web:398ba822c358556a7a6ba4",
            measurementId: "G-DJCWTRD7QQ"
        };

        const app = initializeApp(firebaseConfig);

        const messaging = getMessaging();

        requestNotificationPermission().then(() => {

            setTimeout(() => {
                getToken(messaging, {
                    vapidKey: 'BByEXMSQ3rmT_P-Z8S6aG26K83zdRRZIwABxGXE9Lh-JO7sGeN2UwAIC9L5ogJ5NoFNAhMk4adoFbd4oV3N_lho'
                })
                    .then((currentToken) => {
                        if (currentToken) {
                            console.log('current token for client: ', currentToken);
                            // Perform any other neccessary action with the token
                        } else {
                            // Show permission request UI
                            console.log('No registration token available. Request permission to generate one.');
                        }
                    })
                    .catch((err) => {
                        console.log('An error occurred while retrieving token. ', err);
                    });
            }, 3000);

        });
    }

    const getNotifications = () => {
        Axios.get("/get-notifications/" + user?.id).then((response) => {
            console.log(response.data);

            setNotifications([...response.data.notifications]);
            setUnread(response.data.unread);
        });
    }

    const readNotifications = (id) => {
        Axios.get("/read-notifications/" + id).then((response) => {
            console.log(response.data);
            setUnread(0);
        });
    }

    const redirectPage = (url, id) => {
        console.log(id);
        window.location.href = url;
        readNotifications(id);
    }

    useEffect(() => {
        getNotifications();
        getPermissions();
    }, []);

    return (
        <div id="layout-wrapper">
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex items-center">
                        {/* LOGO */}
                        <div className="navbar-brand-box">
                            <a href="#" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src="/assets/images/logo2.png" alt="" className="md:w-16 md:h-16 sm:w-6 " />
                                </span>
                                <span className="logo-lg flex items-center justify-start">
                                    <img src="/assets/images/logo2.png" alt="" className="h-13 w-6" />{" "}
                                    <span className="logo-txt">Saka Tracker</span>
                                </span>
                            </a>
                        </div>
                        <button type="button" className="btn btn-sm px-3 font-size-16 header-item bg-transparent"
                            id="vertical-menu-btn" onClick={bodyClicked}>
                            <i className="fa fa-fw fa-bars" />
                        </button>
                    </div>
                    <div className="d-flex">
                        <div className="dropdown d-inline-block">
                            <button onClick={readNotifications} type="button" className="btn header-item noti-icon position-relative bg-transparent"
                                id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <Bell />
                                {unreadNotifications > 0 ? (
                                    <span className="badge bg-danger rounded-pill">
                                        {unreadNotifications}
                                    </span>
                                ) : ""}
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                aria-labelledby="page-header-notifications-dropdown">
                                <div className="p-3">
                                <div className="row align-items-center mb-5">
                                        <div className="col">
                                            <a href={route('notification.index')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                Show All Notifications
                                            </a>
                                        </div>
                                        <div className="col-auto">
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0">
                                                 {" "}
                                                Notifications{" "}
                                            </h6>
                                        </div>
                                        <div className="col-auto">
                                        </div>
                                    </div>
                                </div>
                                <div style={{ maxHeight: "230px", overflowY: 'scroll' }}>
                                    {notifications.map((item, index) => (
                                        <a href="#" className="text-reset notification-item" style={{ opacity: item.read ? 0.3 : 1 }}>
                                            <div onClick={() => redirectPage(item.url, item.id)} className="d-flex" style={{ cursor: 'pointer !important' }}>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1">
                                                        {item.title}
                                                    </h6>
                                                    <div className="font-size-13 text-muted">
                                                        <p className="mb-1">
                                                            {item.description}
                                                        </p>
                                                        <p className="mb-0">
                                                            <i className="mdi mdi-clock-outline" />{" "}
                                                            <span>{moment(item.created_at).fromNow()}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="dropdown d-inline-block">
                            <button type="button"
                                className="btn header-item bg-light-subtle border-start border-end bg-transparent"
                                id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <img className="rounded-circle header-profile-user" src="/assets/images/users/avatar-1.jpg"
                                    alt="Header Avatar" />
                                <div className="hidden sm:hidden lg:block md:block">
                                    <span className="d-xl-inline-block ms-1 fw-medium">
                                        {user?.name}
                                    </span>
                                    <i className="mdi mdi-chevron-down d-xl-inline-block" />
                                </div>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                {/* item*/}
                                <a className="dropdown-item" href={route("profile.edit")}>
                                    <i className="mdi mdi mdi-face-man font-size-16 align-middle me-1" />{" "}
                                    Profile
                                </a>
                                <Dropdown.Link href={route("logout")} method="post" as="button">
                                    <i className="mdi mdi-logout font-size-16 align-middle" />{" "}
                                    Logout
                                </Dropdown.Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* ========== Left Sidebar Start ========== */}
            <div className="vertical-menu">
                <div data-simplebar className="h-100">
                    {/*- Sidemenu */}
                    <div id="sidebar-menu">
                        {/* Left Menu Start */}
                        <ul className="metismenu list-unstyled" id="side-menu">
                            {user?.role != "vendor" ? (
                                <>
                                    <li>
                                        <a href={route("dashboard")}>
                                            <Home />
                                            <span>Home</span>
                                        </a>
                                    </li>
                                    {permissions.includes('index_exchange_invoice') ?
                                        <li>
                                            <a href={route("admin.exchange-invoice.index")}>
                                                <FileText />
                                                <span>Manajemen Invoice</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_batch_payment') ?
                                        <li>
                                            <a href={route("admin.batch-payment.index")}>
                                                <CreditCard />
                                                <span>Batch Payment</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_pay_ready') ?
                                        <li>
                                            <a href={route("admin.siap-bayar.index")}>
                                                <CreditCard />
                                                <span>Siap Bayar</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_request_gr') ?
                                        <li>
                                            <a href={route("admin.request-good-receipt.index")}>
                                                <FileText />
                                                <span>Request GR</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_role') ?
                                        <li>
                                            <a href={route("role.index")}>
                                                <Lock />
                                                <span>Role</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_suffix') ?
                                        <li>
                                            <a href={route("suffix.index")}>
                                                <Database />
                                                <span>Suffix</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_prefix') ?
                                        <li>
                                            <a href={route("prefix.index")}>
                                                <Database />
                                                <span>Prefix</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_ship_to') ?
                                        <li>
                                            <a href={route("ship-to.index")}>
                                                <Database />
                                                <span>ShipTo</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_bill_to') ?
                                        <li>
                                            <a href={route("bill-to.index")}>
                                                <Database />
                                                <span>BillTo</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {
                                        user?.role !== 'vendor' ? (
                                            <li>
                                                <a href="javascript:;">

                                                    <Shuffle />
                                                    <SidebarDropdown title="Master Data">
                                                        <ul>
                                                            {permissions.includes('index_user') ?
                                                                <li>

                                                                    <a href={route("master-user.index")}>
                                                                        <Users />
                                                                        <span>Master User</span>
                                                                    </a>
                                                                </li>
                                                                : ''}

                                                            {permissions.includes('index_locations') ?
                                                                <li><a href={route("admin.location.index")}>
                                                                    <Shuffle />
                                                                    <span>Master Locations</span>
                                                                </a></li>
                                                                : ''}

                                                            {permissions.includes('index_supplier_site') ?
                                                                <li><a href={route("admin.supplier-site.index")}>
                                                                    <Shuffle />
                                                                    <span>Master Supplier Site</span>
                                                                </a></li>
                                                                : ''}

                                                            {
                                                                permissions.includes('index_approver_vendor') ?

                                                                    <li><a href={route("approver-vendor.index")}>
                                                                        <Shuffle />
                                                                        <span>Master Approver Vendor</span>
                                                                    </a></li>
                                                                    : ''
                                                            }

                                                            {permissions.includes('index_approver_invoice') ?
                                                                <li><a href={route("approver-invoice.index")}>
                                                                    <Shuffle />
                                                                    <span>Master Approver Invoice</span>
                                                                </a></li>
                                                                : ''}
                                                            {permissions.includes('index_approver_payment') ?
                                                                <li><a href={route("approver-payment.index")}>
                                                                    <Shuffle />
                                                                    <span>Master Approver Payment</span>
                                                                </a></li>
                                                                : ''}
                                                        </ul>
                                                    </SidebarDropdown>
                                                </a>

                                            </li>
                                        ) : null
                                    }

                                    {permissions.includes('index_payment_term') ?
                                        <li>
                                            <a href={route("payment-term.index")}>
                                                <Calendar />
                                                <span>Payment Term</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_tax') ?
                                        <li>
                                            <a href={route("tax.index")}>
                                                <Percent />
                                                <span>Tax</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_sla_calendar') ?
                                        <li>
                                            <a href={route("admin.sla-calendar.index")}>
                                                <Calendar />
                                                <span>SLA Calendar</span>
                                            </a>
                                        </li>
                                        : ''}




                                    {permissions.includes('index_matching') ?
                                        <li>
                                            <a href={route("admin.matching.index")}>
                                                <BarChart />
                                                <span>Matching</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_vendors') ?
                                        <li>
                                            <a href={route("admin.vendor.index")}>
                                                <Users />
                                                <span>Vendor</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_vendor_profile') ?
                                        <li>
                                            <a href={route("admin.vendor-profile.index")}>
                                                <Users />
                                                <span>Perubahan Data</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_vendor_profile') ?
                                        <li>
                                            <a href={route("admin.approval-history.index")}>
                                                <List />
                                                <span>History Approval</span>
                                            </a>
                                        </li>
                                        : ''}
                                    {permissions.includes('index_monitoring_sla') ?
                                        <li>
                                            <a>
                                                <Users />
                                                <SidebarDropdown title="Monitoring SLA">
                                                    <ul>
                                                        <li>
                                                            <a href={route("admin.monitoring-sla.vendor.index")}>SLA Vendor</a>
                                                        </li>
                                                        <li>
                                                            <a href={route("admin.monitoring-sla.invoice.index")}>SLA Invoice</a>
                                                        </li>
                                                        <li>
                                                            <a href={route("admin.monitoring-sla.payment.index")}>
                                                                SLA Payment</a>
                                                        </li>
                                                    </ul>
                                                </SidebarDropdown>
                                            </a>
                                        </li>
                                        : ''}

                                    {permissions.includes('index_summary_sla') ?
                                        <li>
                                            <a>
                                                <Users />
                                                <SidebarDropdown title="Summary SLA">
                                                    <ul>
                                                        <li>
                                                            <a href={route("admin.summary-sla.vendor.index")}>SLA Vendor</a>
                                                        </li>
                                                        <li>
                                                            <a href={route("admin.summary-sla.invoice.index")}>SLA Invoice</a>
                                                        </li>
                                                        <li>
                                                            <a href={route("admin.summary-sla.payment.index")}>
                                                                SLA Payment</a>
                                                        </li>
                                                    </ul>
                                                </SidebarDropdown>
                                            </a>
                                        </li>
                                        : ''}
                                </>
                            ) : (
                                ""
                            )}

                            {user?.role == "vendor" ? (
                                <>
                                    <li>
                                        <a href={route("vendor.report.index")}>
                                            <Home />
                                            <span>Home</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={route("exchange-invoice.index")}>
                                            <FileText />
                                            <span>Tukar Faktur</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={route("request-good-receipt.index")}>
                                            <FileText />
                                            <span>Request GR</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);" className="has-arrow ml-auto" onClick={
                                            toggleSidebarDropdownClicked}>
                                            <Users />
                                            <span data-key="t-authentication">
                                                Vendor Management
                                            </span>
                                        </a>
                                        <ul className={`sub-menu ${toggleSidebarDropdown}`} aria-expanded="false">
                                            <li>
                                                <a href={route("vendor.company-profile.index")}>Company Profile</a>
                                            </li>
                                            <li>
                                                <a href={route("vendor.index")}>
                                                    Perubahan Data
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            ) : (
                                ""
                            )}
                            {user?.role == "vendor" ? (
                                <>
                                    <li>
                                        <a href={route("vendor.report.index")}>
                                            <Home />
                                            <span>Dashboard Report Vendor</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={route("exchange-invoice.index")}>
                                            <FileText />
                                            <span>Tukar Faktur</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={route("request-good-receipt.index")}>
                                            <FileText />
                                            <span>Request GR</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript: void(0);" className="has-arrow ml-auto" onClick={
                                            toggleSidebarDropdownClicked}>
                                            <Users />
                                            <span data-key="t-authentication">
                                                Vendor Management
                                            </span>
                                        </a>
                                        <ul className={`sub-menu ${toggleSidebarDropdown}`} aria-expanded="false">
                                            <li>
                                                <a href={route("vendor.company-profile.index")}>Company Profile</a>
                                            </li>
                                            <li>
                                                <a href={route("vendor.index")}>
                                                    Perubahan Data
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            ) : (
                                user?.role === 'admin' ? (
                                    <>
                                        <li>
                                            <a href={route("admin.dashboard-report")}>
                                                <Home />
                                                <span>Dashboard Report Admin</span>
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <a href={route("approver.dashboard-report")}>
                                                <Home />
                                                <span>Dashboard Report Approver</span>
                                            </a>
                                        </li>
                                    </>
                                )
                            )}
                            {/* menu report */}
                            {user?.role != "vendor" ?
                                <>
                                    {permissions.includes('index_report') ?
                                        <li>
                                            <a href={route("admin.report.index")}>
                                                <File />
                                                Report
                                            </a>
                                        </li>
                                        : ''}
                                </>
                                : ''}
                        </ul>
                    </div>
                    {/* Sidebar */}
                </div>
            </div>
            {/* Left Sidebar End */}
            {/* ============================================================== */}
            {/* Start right Content here */}
            {/* ============================================================== */}
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        {/* <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">Home</h4>
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                            <li className="breadcrumb-item active">Home</li>
                        </ol>
                    </div>
                </div> */}
                        {children}
                    </div>
                    {/* container-fluid */}
                </div>
                {/* End Page-content */}
                {/* <footer className="footer">
            <div className="container-fluid">
                <div className="grid grid-cols-2">
                    <div className="col-sm-6">
                        2023 © Minia.
                    </div>
                    <div className="col-sm-6">
                        <div className="text-sm-end d-none d-sm-block">
                            Design &amp; Develop by <a href="#!" className="text-decoration-underline">Themesbrand</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer> */}
            </div>
            {/* end main content*/}
        </div>
    );
}
