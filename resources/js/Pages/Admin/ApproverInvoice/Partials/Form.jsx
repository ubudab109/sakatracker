
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
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        // role_id: props.data.approver != null ? props.data.approver.role_id : '',
        name: props.data != null ? props.data.approver.name : '',
    });

    // const [selectedOptionRole, setSelectedOptionRole] = useState(props.data.approver != null ? props.data.approver.role_id : '');

    const submit = (e) => {
        e.preventDefault();

        if(props.title == 'Tambah') {
            post(route(props.route));
        } else {
            post(route(props.route, props.id));
        }
    };
    
    // const handleRoleChange = (event) => {
    //     data.role_id = event.target.value;

    //     setSelectedOptionRole(data.role_id);
    // }

    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <form onSubmit={submit}>
                {/* <div className="mb-3">
                <InputLabel value="Role" className="font-bold" required={true}/>
                <select className="select select-bordered w-full mt-1"
                    id="role_id"
                    name="role_id"
                    value={selectedOptionRole}
                    onChange={handleRoleChange}
                >
                    <option value="" hidden>Role</option>
                    {props.data.roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name}
                        </option>
                    ))}
                </select>

                <InputError message={errors.role_id} className="mt-2" />
                </div> */}

                <div className="mb-3">
                    <InputLabel htmlFor="name" value="name" required={true} />

                    <TextInput 
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        placeholder="nama.."
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        
                    />

                    <InputError 
                        message={errors.name}
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