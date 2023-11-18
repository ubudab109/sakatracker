
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModifyButton from "@/Components/ModifyButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

export default function Form(props) {
    console.log(props);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: props.data != null ? props.data.payment_term.name : '',
        day: props.data != null ? props.data.payment_term.day : '',
    });

    const submit = (e) => {
        e.preventDefault();

        if(props.title == 'Tambah') {
            post(route(props.route));
        } else {
            post(route(props.route, props.id));
        }
    };

    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <form onSubmit={submit}>
                <div className="mb-3">
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
                </div>

                <div className="mb-3">
                    <InputLabel htmlFor="day" value="Day" required={true} />

                    <TextInput 
                        id="day"
                        name="day"
                        value={data.day}
                        type="number"
                        className="mt-1 block w-full"
                        autoComplete="day"
                        placeholder="day.."
                        isFocused={true}
                        onChange={(e) => setData('day', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.day}
                        className="mt-2"
                    />
                </div>
                
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