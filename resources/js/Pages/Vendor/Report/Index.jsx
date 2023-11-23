import '../../../../css/chart.css';
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
import CardDashboardChart from '@/Components/CardDashboardChart';


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

            {/* <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Home</div>
                    </div>
                </div>
            </div> */}

            <div className="pt-6">
                <div className="">
                    <div className="border-0 border-black rounded-lg p-0">
                        <form method="get">
                            <div className='flex gap-3 justify-evenly items-center'>
                                <div className='w-full'>
                                    <br />
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

            <div className="row mt-5">
                <CardDashboardChart name="PO Outstanding" data={props.data.card_outstanding.po_amount} />
                <CardDashboardChart name="Outstanding Invoice" data={props.data.card_outstanding.invoice_amount} />
                <CardDashboardChart name="Outstanding Invoice Amount" data={props.data.card_outstanding.formated_invoice_total} />
            </div>

            {/* <CardOutstanding className="pt-6" data={props.data.card_outstanding} month={data.month} /> */}
            <div className="row">
                <ChartOutstandingPercentage data={props.data.chart_outstanding_percentage} />
                <ChartOutstandingProcessing data={props.data.chart_outstanding_processing} />
                <ChartOverdue data={props.data.chart_overdue} month={props.data.month_name} />
            </div>
            {/* <div className='flex justify-evenly items-center mt-3 gap-3'>
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
            </div> */}

        </AuthenticatedLayout>
    );
}
