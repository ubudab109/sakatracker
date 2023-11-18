import { useState } from 'react';
import SideNavLayout from './SideNavLayout';

export default function Authenticated({ user, header, children }) {
    return (
        <div>
                <SideNavLayout auth={user} />

                <div className="sm:ml-64">
                    <div className="mt-14">
                        {children}
                    </div>
                </div>

        </div>
    );
}
