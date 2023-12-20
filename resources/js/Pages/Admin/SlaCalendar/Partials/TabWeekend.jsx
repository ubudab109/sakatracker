
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

export default function TabWeekend(props) {
    // console.log(props);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        day: props.data.sla_weekend_days,
        is_holiday: props.data.sla_weekend_is_holidays,
        start_time: props.data.sla_weekend_start_times,
        end_time: props.data.sla_weekend_end_times,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.sla-weekend.store'));
    };

    const [selectedItemsHoliday, setSelectedItemsHoliday] = useState(props.data.sla_weekend_is_holidays);

    const handleCheckboxChange = (index, event) => {
        if(selectedItemsHoliday[index])
        {
            setSelectedItemsHoliday({
              ...selectedItemsHoliday,
              [index]: false,
            });
            data.is_holiday[index] = false;
        } else {
            setSelectedItemsHoliday({
                ...selectedItemsHoliday,
                [index]: true,
            });
            data.is_holiday[index] = true;
        }
      };
    
    const handleInputChange = (index, event, name) => {
        if(name == 'start_time') {
            data.start_time[index] = event.target.value;
        } else if(name == 'end_time') {
            data.end_time[index] = event.target.value;
        }
    };

    return (
        <div>
            <form onSubmit={submit}> 
                <table className="table-auto w-full text-center">
                    <thead>
                        <tr className="border-b-2">
                            <th>Day</th>
                            <th>Holiday</th>
                            <th>Start Hour</th>
                            <th>End Hour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.sla_weekends.map((item, index) => (
                            <tr>
                                <td>{item.day}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name="is_holiday[]"
                                        className="form-checkbox"
                                        checked={selectedItemsHoliday[index]}
                                        onChange={(event) =>
                                            handleCheckboxChange(index, event)
                                        }
                                    />
                                </td>
                                <td>
                                    <TextInput 
                                        id="name"
                                        name="start_time"
                                        type="time"
                                        value={item.start_time}
                                        className="mt-1 block mx-auto w-full"
                                        isFocused={true}
                                        disabled={selectedItemsHoliday[index] == false ? false : true}
                                        onChange={(event) =>
                                            handleInputChange(index, event, 'start_time')
                                        }
                                    />
                                </td>
                                <td>
                                    <TextInput 
                                        id="name"
                                        name="end_time"
                                        type="time"
                                        value={item.end_time}
                                        className="mt-1 block mx-auto w-full ms-3"
                                        isFocused={true}
                                        disabled={selectedItemsHoliday[index] == false ? false : true}
                                        onChange={(event) =>
                                            handleInputChange(index, event, 'end_time')
                                        }
                                        
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="border-t-2 mt-3"></div>
                <div className="flex items-center float-end gap-2 mt-3">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Successfully to updated data.</p>
                    </Transition>
                    {props.data.permissions.includes('update_sla_calendar') ?
                        <PrimaryButton>
                            Save
                        </PrimaryButton>
                    :''}
                </div>
            </form>
        </div>
    );    
}