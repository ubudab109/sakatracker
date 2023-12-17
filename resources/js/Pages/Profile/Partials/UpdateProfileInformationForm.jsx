import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import ModifyButton from "@/Components/ModifyButton";
import DangerButton from "@/Components/DangerButton";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const {
        data,
        setData,
        patch,
        post,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        name: user.name,
        email: user.email,
        code: "",
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    const [showOtpInput, setShowOtpInput] = useState(true);

    const changeEmail = () => {
        setShowOtpInput(false);
    };

    const sendOtp = (e) => {
        post(route("verification-email.resend-otp"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        readOnly
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="">
                    <div>
                        <>
                            <InputLabel htmlFor="email" value="Old Email" />
                            <TextInput
                                id="email_old"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                required
                                autoComplete="username"
                                readOnly
                                disabled
                            />
                        </>
                        {!showOtpInput ? (
                            <>
                                <InputLabel htmlFor="email" value="New Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    placeholder="New Email"
                                    autoComplete="username"
                                    disabled={showOtpInput}
                                />
                            </>
                        ) : null}

                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div className="text-end mt-1">
                        <ModifyButton
                            hidden={showOtpInput}
                            onClick={() => sendOtp()}
                            maxTime={10}
                            className="mt-3"
                            type="button"
                        >
                            Kirim OTP
                        </ModifyButton>
                        <PrimaryButton onClick={(e) => changeEmail(e)}>
                            Ganti Email
                        </PrimaryButton>
                        {!showOtpInput ? (
                            <DangerButton
                                type="button"
                                onClick={() => setShowOtpInput(true)}
                            >
                                Cancel
                            </DangerButton>
                        ) : null}
                    </div>
                </div>

                <div hidden={showOtpInput}>
                    <InputLabel htmlFor="code" value="Kode OTP" />

                    <TextInput
                        id="code"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.code}
                        onChange={(e) => setData("code", e.target.value)}
                        required
                        placeholder="OTP"
                        disabled={showOtpInput}
                    />

                    <InputError className="mt-2" message={errors.code} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
