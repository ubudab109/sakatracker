import { React } from "react";
import HomeLayout from '@/Layouts/HomeLayout';
import { Link, Head } from '@inertiajs/react';
import ModifyButton from '@/Components/ModifyButton';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Home() {
    return (
        <HomeLayout>
            <Head title="Home" />
            <Link href={route('register')}>
                <PrimaryButton className="ml-2">
                    Register
                </PrimaryButton>
            </Link>
            <Link href={route('login')}>
                <ModifyButton className="ml-2 w-33 text-white" disabled={false} type="button">
                    Login
                </ModifyButton>
            </Link>
            <Link href={route('welcome')}>
                <SecondaryButton className="ml-2 w-33">
                    Welcome
                </SecondaryButton>
            </Link>
        </HomeLayout>
    );
}