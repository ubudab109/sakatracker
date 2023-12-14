import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useState } from 'react';

export default function VerificationEmail(props) {
    console.log(props);

    const { data, setData, post, processing, errors } = useForm({
        email: props.user != '' ? props.user.email : '',
        otp_code: props.otp_code ?? '',
    });

    const [isDisabledEmail, setIsDisabledEmail] = useState(true);

    const submit = (e) => {
        e.preventDefault();

        post(route('verification-email.store'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Kata Sandi" />

            <b className='text-2xl'>Konfirmasi Kode OTP</b>

            <div className="mb-4 text-sm text-gray-600 mt-4">
                Silahkan cek email anda untuk mendapatkan kode OTP.
            </div>

            <form onSubmit={submit}>
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="Email address"
                        className={`mt-1 block w-full ${isDisabledEmail ? 'bg-gray-100' : ''}`}
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        readOnly={isDisabledEmail}
                    />

                    <InputError message={errors.email} className="mt-2" />
                    <PrimaryButton type="button" onClick={() => {
                        if (isDisabledEmail) setIsDisabledEmail(false);
                        else setIsDisabledEmail(true);
                    }} className="mt-2">{isDisabledEmail ? 'Edit Email' : 'Cancel'}</PrimaryButton>
                </div>
                <div className="mt-3">
                    <TextInput
                        id="otp_code"
                        type="text"
                        name="otp_code"
                        placeholder="Kode OTP"
                        className="mt-1 block w-full"
                        isFocused={true}
                        value={data.otp_code}
                        onChange={(e) => setData('otp_code', e.target.value)}
                    />

                    <InputError message={errors.otp_code} className="mt-2" />
                </div>

                <ResendOTP onResendClick={() => post(`/verification-email/resend-otp?user=${props.user.id}&email=${data.email}`)} maxTime={10} className="mt-3" />

                <div className="flex items-center justify-between mt-4">
                    <Link href={route('login')} className='underline text-blue-800'>
                        Kembali Login
                    </Link>
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Verifikasi Email
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
