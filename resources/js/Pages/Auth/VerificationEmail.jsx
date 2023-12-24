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
        <div class="auth-page">
            <Head title="Confirm OTP Code" />
            <div class="container-fluid p-0">
                <div class="row g-0">
                    <div class="col-xxl-3 col-lg-4 col-md-5">
                        <div class="auth-full-page-content d-flex p-sm-5 p-4">
                            <div class="w-100">
                                <div class="d-flex flex-column h-100">
                                    <div class="mb-1 mb-md-1 text-center max-w-screen-lg mx-auto">
                                        <a href="#" class="d-block auth-logo">
                                            <img src="/assets/images/logo-chams.png" width={128} />
                                        </a>
                                    </div>
                                    <div class="auth-content my-auto">
                                        <div class="text-center">
                                            <h5 class="mb-0">Confirm OTP Code</h5>
                                            <p class="text-muted mt-2">Confirm OTP Code with Chams.</p>
                                        </div>
                                        <div class="alert alert-success text-center my-4" role="alert">
                                            Enter your Email and Code OTP for verification account!
                                        </div>
                                        <form class="mt-4" onSubmit={submit}>
                                            <div class="mb-3">
                                                <label class="form-label">Email</label>
                                                <input type="text" name="email" class="form-control" id="email" placeholder="Enter email" 
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    readOnly={isDisabledEmail}
                                                />
                                                <InputError message={errors.email} className="mt-2" />
                                                <PrimaryButton type="button" onClick={() => {
                                                    if (isDisabledEmail) setIsDisabledEmail(false);
                                                    else setIsDisabledEmail(true);
                                                }} className="mt-1 float-right mb-3">{isDisabledEmail ? 'Edit Email' : 'Cancel'}</PrimaryButton>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">OTP Code</label>
                                                <input type="text" name="otp_code" class="form-control" id="otp_code" placeholder="Enter otp code" 
                                                    value={data.otp_code}
                                                    onChange={(e) => setData('otp_code', e.target.value)}
                                                />
                                                <InputError message={errors.otp_code} className="mt-2" />
                                            </div>
                                            <ResendOTP onResendClick={() => post(`/verification-email/resend-otp?user=${props.user.id}&email=${data.email}`)} maxTime={10} className="mt-3" />
                                            <div class="mb-3 mt-4">
                                                <button class="btn btn-primary w-100 waves-effect waves-light" type="submit" disabled={processing}>Submit</button>
                                            </div>
                                        </form>

                                        <div class="mt-5 text-center">
                                            <p class="text-muted mb-0">Already verification account ?  <a href={route('login')}
                                                    class="text-primary fw-semibold"> Sign In </a> </p>
                                        </div>
                                    </div>
                                    <div class="mt-4 mt-md-5 text-center">
                                        {/* <p class="mb-0">© <script>2023</script> Chams   . Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-9 col-lg-8 col-md-7">
                        <div class="auth-bg pt-md-5 p-4 d-flex">
                            <div class="bg-overlay bg-primary"></div>
                            <ul class="bg-bubbles">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
