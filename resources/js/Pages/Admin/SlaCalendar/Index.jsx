import TabButton from '@/Pages/Vendor/Profile/Components/TabButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ModifyButton from '@/Components/ModifyButton';
import TabWeekend from './Partials/TabWeekend';
import TabHoliday from './Partials/TabHoliday';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import React from "react";

export default function Index(props) {
    const [tabPane1, setTabPane1] = useState('');
    const [tabPane2, setTabPane2] = useState('hidden');

    const handleCardClicked = (index) => {
        const tabPaneStates = ['hidden', 'hidden']; // Assuming you have 5 tab panes
        
        tabPaneStates[index] = '';
        
        setTabPane1(tabPaneStates[0]);
        setTabPane2(tabPaneStates[1]);
    }

    const openCard1Clicked = () => {
        handleCardClicked(0);
    }
    
    const openCard2Clicked = () => {
        handleCardClicked(1);
    }
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">SLA Calendar</h2>}
        >
            <Head title="SLA Calendar" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">SLA Calendar</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">SLA Calendar</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">SLA Calendar</div>
                    </div>
                </div>
            </div>

            <div className="pt-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
                                <div onClick={openCard1Clicked}>
                                    <TabButton title="Weekend" />
                                </div>
                                <div onClick={openCard2Clicked}>
                                    <TabButton title="Holiday" />
                                </div>
                            </nav>
                        </div>
                        <div className='mt-3'>
                            <div id="card-type-tab-1" className={`${tabPane1}`} role="tabpanel" aria-labelledby="card-type-tab-item-1">
                                <TabWeekend data={props.data} permissions={props.data.permissions}/>
                            </div>
                            <div id="card-type-tab-2" className={`${tabPane2}`} role="tabpanel" aria-labelledby="card-type-tab-item-2">
                                <TabHoliday data={props.data} permissions={props.data.permissions}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
