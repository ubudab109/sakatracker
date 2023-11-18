import { React } from "react";
import { Head, Link } from "@inertiajs/react";

export default function Home({children}) {
    return (
        <div className="flex sm:justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full text-center sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}