import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import React, { useState } from "react";

function SideNavLayout(props) {
    const [toggleProfile, setToggleProfile] = useState(false);

    const toggleProfileClicked = () => {
        setToggleProfile(!toggleProfile);
    };

    const [toggleSidebar, setToggleSidebar] = useState("translate-x-0");

    const toggleSidebarClicked = () => {
        if (toggleSidebar == "translate-x-0") {
            setToggleSidebar("");
        } else {
            setToggleSidebar("translate-x-0");
        }
    };

    if (route().current("")) {
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
    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between z-50">
                        <div className="flex items-center justify-start">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                onClick={toggleSidebarClicked}
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <a href="#" className="flex ml-2 md:mr-24">
                                <img
                                    src="/images/logo-kalbe-black.png"
                                    className="h-10 w-50"
                                />
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div>
                                            <span className="absolute top-0 right-0 -mt-2 -mr-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                                                2
                                            </span>
                                            <button
                                                type="button"
                                                className="flex "
                                                data-dropdown-toggle="dropdown-user"
                                                aria-expanded={toggleProfile}
                                                onClick={toggleProfileClicked}
                                            >
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href="#">
                                            <div className="">
                                                <p className="text-sm">
                                                    Perubahan Data
                                                </p>
                                                <p className="text-xs">
                                                    Disetujui approver
                                                </p>
                                            </div>
                                        </Dropdown.Link>
                                        <p className="border-dashed border-gray-100 border-2"></p>
                                        <Dropdown.Link href="#">
                                            <div className="">
                                                <p className="text-sm">
                                                    Perubahan Data
                                                </p>
                                                <p className="text-xs">
                                                    Ditolak approver
                                                </p>
                                            </div>
                                        </Dropdown.Link>
                                        <p className="border-dashed border-gray-100 border-2"></p>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                            <div className="flex items-center ml-5">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div>
                                            <button
                                                type="button"
                                                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                                data-dropdown-toggle="dropdown-user"
                                                aria-expanded={toggleProfile}
                                                onClick={toggleProfileClicked}
                                            >
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <img
                                                    className="w-8 h-8 rounded-full"
                                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                    alt="user photo"
                                                />
                                            </button>
                                        </div>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <aside
                id="logo-sidebar"
                className={`${toggleSidebar} fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li className="mb-5">
                            <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                                    <img
                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-xs font-semibold text-gray-700">
                                        {props.auth.name}
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        {props.auth.email}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                </svg>
                                <p className="ml-2">Home</p>
                            </NavLink>
                        </li>
                        {props.auth.role == "vendor" ? (
                            <div>
                                <li className="mb-2">
                                    <NavLink href="#">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                            />
                                        </svg>
                                        <p className="ml-2">Tukar Faktur</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        aria-controls="dropdown-example"
                                        data-collapse-toggle="dropdown-example"
                                        onClick={toggleSidebarDropdownClicked}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                            />
                                        </svg>

                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                            Vendor Management
                                        </span>
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                    <ul
                                        id="dropdown-example"
                                        className={`${toggleSidebarDropdown} py-2 space-y-2`}
                                    >
                                        <li>
                                            <a
                                                href="#"
                                                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            >
                                                - Company Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={route("vendor.index")}
                                                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            >
                                                - Perubahan Data
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </div>
                        ) : (
                            ""
                        )}

                        {props.auth.role != "vendor" ? (
                            <div>
                                <li className="mb-2">
                                    <NavLink
                                        href={route("admin.vendor.index")}
                                        active={route().current(
                                            "admin.vendor.index"
                                        )}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                            />
                                        </svg>
                                        <p className="ml-2">Vendor</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        href={route(
                                            "admin.vendor-profile.index"
                                        )}
                                        active={route().current(
                                            "admin.vendor-profile.index"
                                        )}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                            />
                                        </svg>

                                        <p className="ml-2">Perubahan Data</p>
                                    </NavLink>
                                </li>
                            </div>
                        ) : (
                            ""
                        )}
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default SideNavLayout;
