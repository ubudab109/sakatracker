
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from '@inertiajs/react';;

export default function Form(props) {
    // console.log(props);
    const { data, setData, put, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: props.title === 'Edit' ? props.data.location.name : '',
        // level: props.data.approver != null ? props.data.approver.level : '',
    });
    const submit = (e) => {
        e.preventDefault();

        if (props.title == 'Tambah') {
            post(route('admin.location.store'));
        } else {
            put(route('admin.location.update', props.id));
        }
    };


    return (
        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg mt-6 p-6">
            <form onSubmit={submit}>
                <div className="mb-3">
                    <InputLabel value="Location Name" className="font-bold" required={true} />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name ?? ''}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="name"
                        placeholder="Location Name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}

                    />

                    <InputError message={errors.name} className="mt-2" />
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