import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center p-2 ' +
                (active
                    ? 'text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700 group '
                    : 'text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group') +
                className
            }
        >
            {children}
        </Link>
    );
}
