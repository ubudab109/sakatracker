import { Link } from "@inertiajs/react";

export default function HeaderUser(props) {
    return (
        <div className="flex">
            <Link href={route('user.index')}>
                <h2 className="font-semibold text-xl text-gray-400 leading-tight">User</h2>
            </Link>
            <span className="mx-2">/</span>
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">{props.title}</h2>
        </div>
    );
}