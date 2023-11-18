
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModifyButton from "@/Components/ModifyButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from "react";

export default function Form(props) {
    console.log(props);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: props.data != null ? props.data.name : '',
        email: props.data != null ? props.data.email : '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        if(props.data.title == 'Tambah') {
            post(route(props.route));
        } else {
            post(route(props.route, props.id));
        }
    };

    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <form onSubmit={submit}>
                <InputLabel htmlFor="name" value="Name" required={true} />

                <TextInput 
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    placeholder="name.."
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                    
                />

                <InputError 
                    message={errors.name}
                    className="mt-2"
                />

                <InputLabel htmlFor="email" value="Email" className="mt-2" required={true} />

                <TextInput 
                    id="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="email"
                    placeholder="email.."
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                    
                />

                <InputError 
                    message={errors.email}
                    className="mt-2"
                />
                
                <InputLabel htmlFor="password" value={props.data != "" ? 'New password' : 'Password'} className="mt-2" />

                <TextInput 
                    id="password"
                    name="password"
                    type="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    placeholder="password.."
                    isFocused={true}
                    onChange={(e) => setData('password', e.target.value)}
                    
                />

                <InputError 
                    message={errors.password}
                    className="mt-2"
                />

                <InputLabel htmlFor="password_confirmation" value="Password Confirmation" className="mt-2" />

                <TextInput 
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    placeholder="password confirmation.."
                    isFocused={true}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    
                />

                <InputError 
                    message={errors.password_confirmation}
                    className="mt-2"
                />
                <div className="flex items-center gap-2 mt-2">
                    <PrimaryButton>
                        Save
                    </PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">{props.message}</p>
                    </Transition>
                </div>
            </form>
        </div>
    );    
}