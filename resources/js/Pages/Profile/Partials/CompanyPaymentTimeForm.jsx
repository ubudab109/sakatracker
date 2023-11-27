import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function CompanyPaymentTimeForm({ vendorData, className }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm([
        {
            id: '',
            name: '',
            payment_time: ''
        }
    ]);

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.updateVendorPayment'));
    };

    useEffect(() => {
        if (vendorData.length > 0) {
            let arr = [];
            vendorData.forEach(item => {
                arr.push({
                    id: item.id,
                    payment_time: item.payment_time === null ? '' : item.payment_time,
                    name: item.name,
                });
            });
            setData(arr);
        }
    }, []);

    return (
        <section className="max-w-xl">
            <header className="mb-4">
                <h2 className="text-lg font-medium text-gray-900">Company Payment Time</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your companies payment time.
                </p>
            </header>
            <form onSubmit={e => submit(e)}>
                {
                    data.length > 0 ? (
                        data.map((item, index) => (
                            <div id={index} key={index} className="mb-3">
                                <InputLabel htmlFor={`time-${item.name}`} value={`Payment Time ${item.name}`} />
                                <input onChange={e => {
                                    let items = [...data];
                                    let item = { ...items[index] };
                                    item.payment_time = e.target.value;
                                    items[index] = item;
                                    setData(items);
                                }} type="time" className="border-gray-300 focus:border-gray-800 focus:ring-gray-800 rounded-md shadow-sm mt-1 block w-full" id={`time-${item.name}`} value={item.payment_time} />
                            </div>
                        ))
                    ) : (
                        <p className="mt-1 text-sm text-gray-600">
                            You do not have any company data.
                        </p>
                    )
                }
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