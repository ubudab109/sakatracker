import { useState } from "react";
import SideNavLayout from "./SideNavLayout";
import NavLink from "@/Components/NavLink";
import { Home, Users } from "react-feather";

export default function AuthenticatedLayoutTest({ user, header, children }) {
    const [body, setBody] = useState("");

    const bodyClicked = () => {
        if (document.body.classList.contains("sidebar-enable")) {
            document.body.classList.remove("sidebar-enable");
            document.body.setAttribute("data-sidebar-size", "sm");
        } else {
            document.body.classList.add("sidebar-enable");
            document.body.setAttribute("data-sidebar-size", "lg");
        }
    };

    const [toggleSidebarDropdown, setToggleSidebarDropdown] =
        useState("hidden");

    const toggleSidebarDropdownClicked = () => {
        if (toggleSidebarDropdown == "hidden") {
            setToggleSidebarDropdown("");
        } else {
            setToggleSidebarDropdown("hidden");
        }
    };
    return (
        <div id="layout-wrapper">
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex items-center">
                        {/* LOGO */}
                        <div className="navbar-brand-box">
                            <a href="#" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img
                                        src="assets/images/logo-sm.svg"
                                        alt=""
                                        className="md:w-16 md:h-16 sm:w-6 "
                                    />
                                </span>
                                <span className="logo-lg flex items-center justify-start">
                                    <img
                                        src="assets/images/logo-sm.svg"
                                        alt=""
                                        className="h-13 w-6"
                                    />{" "}
                                    <span className="logo-txt">Minia</span>
                                </span>
                            </a>
                        </div>
                        <button
                            type="button"
                            className="btn btn-sm px-3 font-size-16 header-item bg-transparent"
                            id="vertical-menu-btn"
                            onClick={bodyClicked}
                        >
                            <i className="fa fa-fw fa-bars" />
                        </button>
                    </div>
                    <div className="d-flex">
                        <div className="dropdown d-inline-block">
                            <button
                                type="button"
                                className="btn header-item noti-icon position-relative bg-transparent"
                                id="page-header-notifications-dropdown"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i data-feather="bell" className="icon-lg" />
                                <span className="badge bg-danger rounded-pill">
                                    5
                                </span>
                            </button>
                            <div
                                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                aria-labelledby="page-header-notifications-dropdown"
                            >
                                <div className="p-3">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0">
                                                {" "}
                                                Notifications{" "}
                                            </h6>
                                        </div>
                                        <div className="col-auto">
                                            <a
                                                href="#!"
                                                className="small text-reset text-decoration-underline"
                                            >
                                                {" "}
                                                Unread (3)
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    data-simplebar
                                    style={{ maxHeight: "230px" }}
                                >
                                    <a
                                        href="#!"
                                        className="text-reset notification-item"
                                    >
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <img
                                                    src="assets/images/users/avatar-3.jpg"
                                                    className="rounded-circle avatar-sm"
                                                    alt="user-pic"
                                                />
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">
                                                    James Lemire
                                                </h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">
                                                        It will seem like
                                                        simplified English.
                                                    </p>
                                                    <p className="mb-0">
                                                        <i className="mdi mdi-clock-outline" />{" "}
                                                        <span>1 hour ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="#!"
                                        className="text-reset notification-item"
                                    >
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 avatar-sm me-3">
                                                <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                    <i className="bx bx-cart" />
                                                </span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">
                                                    Your order is placed
                                                </h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">
                                                        If several languages
                                                        coalesce the grammar
                                                    </p>
                                                    <p className="mb-0">
                                                        <i className="mdi mdi-clock-outline" />{" "}
                                                        <span>3 min ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="#!"
                                        className="text-reset notification-item"
                                    >
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 avatar-sm me-3">
                                                <span className="avatar-title bg-success rounded-circle font-size-16">
                                                    <i className="bx bx-badge-check" />
                                                </span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">
                                                    Your item is shipped
                                                </h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">
                                                        If several languages
                                                        coalesce the grammar
                                                    </p>
                                                    <p className="mb-0">
                                                        <i className="mdi mdi-clock-outline" />{" "}
                                                        <span>3 min ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="#!"
                                        className="text-reset notification-item"
                                    >
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <img
                                                    src="assets/images/users/avatar-6.jpg"
                                                    className="rounded-circle avatar-sm"
                                                    alt="user-pic"
                                                />
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">
                                                    Salena Layfield
                                                </h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">
                                                        As a skeptical Cambridge
                                                        friend of mine
                                                        occidental.
                                                    </p>
                                                    <p className="mb-0">
                                                        <i className="mdi mdi-clock-outline" />{" "}
                                                        <span>1 hour ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="p-2 border-top d-grid">
                                    <a
                                        className="btn btn-sm btn-link font-size-14 text-center"
                                        href="javascript:void(0)"
                                    >
                                        <i className="mdi mdi-arrow-right-circle me-1" />{" "}
                                        <span>View More..</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown d-inline-block">
                            <button
                                type="button"
                                className="btn header-item bg-light-subtle border-start border-end bg-transparent"
                                id="page-header-user-dropdown"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img
                                    className="rounded-circle header-profile-user"
                                    src="assets/images/users/avatar-1.jpg"
                                    alt="Header Avatar"
                                />
                                <div className="hidden sm:hidden lg:block md:block">
                                    <span className="d-xl-inline-block ms-1 fw-medium">
                                        Shawn L.
                                    </span>
                                    <i className="mdi mdi-chevron-down d-xl-inline-block" />
                                </div>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                {/* item*/}
                                <a
                                    className="dropdown-item"
                                    href="apps-contacts-profile.html"
                                >
                                    <i className="mdi mdi mdi-face-man font-size-16 align-middle me-1" />{" "}
                                    Profile
                                </a>
                                <a
                                    className="dropdown-item"
                                    href="auth-logout.html"
                                >
                                    <i className="mdi mdi-logout font-size-16 align-middle me-1" />{" "}
                                    Logout
                                </a>
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
                            <li>
                                <a href={route("dashboard")}>
                                    <Home />
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href={route("admin.vendor.index")}>
                                    <Users />
                                    <span>Vendor</span>
                                </a>
                            </li>
                            <li>
                                <a href={route("admin.vendor-profile.index")}>
                                    <Users />
                                    <span>Perubahan Data</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="javascript: void(0);"
                                    className="has-arrow"
                                    onClick={toggleSidebarDropdownClicked}
                                >
                                    <i data-feather="users"></i>
                                    <span data-key="t-authentication">
                                        Authentication
                                    </span>
                                </a>
                                <ul
                                    className={`sub-menu ${toggleSidebarDropdown}`}
                                    aria-expanded="false"
                                >
                                    <li>
                                        <a
                                            href="auth-login.html"
                                            data-key="t-login"
                                        >
                                            Login
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="auth-register.html"
                                            data-key="t-register"
                                        >
                                            Register
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="auth-recoverpw.html"
                                            data-key="t-recover-password"
                                        >
                                            Recover Password
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="auth-lock-screen.html"
                                            data-key="t-lock-screen"
                                        >
                                            Lock Screen
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="auth-logout.html"
                                            data-key="t-logout"
                                        >
                                            Log Out
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="auth-confirm-mail.html"
                                            data-key="t-confirm-mail"
                                        >
                                            Confirm Mail
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="auth-email-verification.html"
                                            data-key="t-email-verification"
                                        >
                                            Email Verification
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="auth-two-step-verification.html"
                                            data-key="t-two-step-verification"
                                        >
                                            Two Step Verification
                                        </a>
                                    </li>
                                </ul>
                            </li>
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
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">
                                        Dashboard
                                    </h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">
                                                    Dashboard
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item active">
                                                Dashboard
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
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
