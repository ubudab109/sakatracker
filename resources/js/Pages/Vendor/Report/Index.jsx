import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from "react";
import CardOutstanding from './Partials/CardOutstanding';
import ChartOutstandingPercentage from './Partials/ChartOutstandingPercentage';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import ChartOverdue from './Partials/ChartOverdue';
import ChartOutstandingProcessing from './Partials/ChartOutstandingProcessing';

export default function Index(props) {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        month: props.data.month,
    });
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Home" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Home</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Home</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Home</div>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="border-1 border-black rounded-lg p-2">
                        <form method="get">
                            <div className='flex gap-3 justify-evenly items-center'>
                                <div className='w-full'>
                                    <InputLabel htmlFor="month" value="Filter Bulan" />

                                    <TextInput 
                                        id="month"
                                        name="month"
                                        value={data.month}
                                        type="month"
                                        className="mt-1 block w-full"
                                        autoComplete="month"
                                        isFocused={true}
                                        onChange={(e) => setData('month', e.target.value)}
                                        
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="" value="&nbsp;" />
                                    <PrimaryButton>
                                        Filter
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <CardOutstanding className="pt-6" data={props.data.card_outstanding} month={data.month} />

            <div className='flex justify-evenly items-center mt-3 gap-3'>
                <div className='bg-white overflow-hidden shadow-lg sm:rounded-lg'>
                    <p className='mt-3 text-center text-lg font-bold'>OTP (%)</p>
                    <ChartOutstandingPercentage data={props.data.chart_outstanding_percentage} />
                </div>
                <div className='bg-white overflow-hidden shadow-lg sm:rounded-lg'>
                    <p className='mt-3 text-center text-lg font-bold'>Overdue Invoice</p>
                    <ChartOverdue data={props.data.chart_overdue} month={props.data.month_name} />
                </div>
                <div className='bg-white overflow-hidden shadow-lg sm:rounded-lg'>
                    <p className='mt-3 text-center text-lg font-bold'>Invoice Processing Invoice</p>
                    <ChartOutstandingProcessing data={props.data.chart_outstanding_processing} />
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
