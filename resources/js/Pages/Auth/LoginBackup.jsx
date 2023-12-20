import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <b className='text-2xl'>Login</b>
            <p className='mt-2'>
            Don't have an account yet?
                <Link href={route('register')} className="text-blue-800 underline ml-1">
                    Register
                </Link>
            </p>

            <form className='mt-10' onSubmit={submit}>
                <div>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className='flex items-center'>
                        <Checkbox 
                            className="mr-1" 
                            value={true} 
                            name="remember"
                            onClick={(e) => setData('remember', e.target.value)}
                        />
                        <InputLabel value="Remember Me" />
                    </div>
                    <Link
                        href={route('password.request')}
                        className="underline text-sm text-blue-800"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <p className='mt-2'>
                    <Link href={route('verification-email')} className="text-blue-800 underline mr-1">
                        Click here
                    </Link>
                    To resend otp code
                </p>

                <div className="flex items-center justify-center mt-4">

                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Login
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
