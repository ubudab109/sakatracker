
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
        date: props.data != null ? props.data.sla_holiday.date : '',
        description: props.data != null ? props.data.sla_holiday.description : '',
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
                    <InputLabel htmlFor="date" value="Date" required={true} />

                    <TextInput 
                        id="date"
                        name="date"
                        type="date"
                        value={data.date}
                        className="mt-1 block w-full"
                        autoComplete="date"
                        placeholder="date.."
                        isFocused={true}
                        onChange={(e) => setData('date', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.date}
                        className="mt-2"
                    />
                </div>

                <div className="mb-3">
                    <InputLabel htmlFor="description" value="Description" required={true} />

                    <TextInput 
                        id="description"
                        name="description"
                        value={data.description}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="description"
                        placeholder="description.."
                        isFocused={true}
                        onChange={(e) => setData('description', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.description}
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